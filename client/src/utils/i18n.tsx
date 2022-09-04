import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { CustomFormats, IntlProvider, useIntl } from 'react-intl'
import memoizeOne from 'memoize-one'
import { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat'
import { EventEmitter } from 'events'
import { Language } from '@title/common/build/types/Language'
import { useAppSelector } from '../store/store'
import { languageSelector } from '../store/session/selectors'

export interface IntlMessages {
	[key: string]: string | IntlMessages
}

type IntlKeyDiscriminator = { readonly $discriminator: unique symbol }
export type IntlKey = string & IntlKeyDiscriminator

type AvailableKeys<I extends IntlMessages> = {
	[K in keyof I]: I[K] extends IntlMessages ? AvailableKeys<I[K]> : IntlKey
}

export interface I18nConfig<K extends IntlMessages> {
	en: K
	fr: { [key in keyof K]: K[key] }
	es?: { [key in keyof K]: K[key] }
}

type FlatIntlMessages = { [key: string]: string }

type FlatI18nConfig = { [lang in Language]: FlatIntlMessages }

function computeFormats (locale: string): CustomFormats {
	return {
		date: {
			shortDate: locale === 'fr'
				? {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric'
				}
				: {
					year: 'numeric',
					month: 'short',
					day: '2-digit'
				},
			longDate: {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}
		}
	}
}

export const formats = memoizeOne(computeFormats)

const emptyFlatI18nConfig = Object.values(Language).reduce((langAcc, lang) => {
	return { ...langAcc, [lang]: {} }
}, {}) as FlatI18nConfig

function flattenAndGenerateKeys<K extends IntlMessages> (messages: I18nConfig<K>, prefix = ''): {
	i18nConfig: FlatI18nConfig
	keys: AvailableKeys<K>
} {
	return Object.keys(messages.en).reduce((acc, key) => {
		const fullKey = `${prefix}.${key}`

		if (typeof messages.en[key] === 'string') {
			return {
				i18nConfig: Object.values(Language).reduce((langAcc, lang) => ({
					...langAcc,
					[lang]: {
						...acc.i18nConfig[lang],
						[fullKey]: messages[lang]?.[key]
					}
				}), {}) as FlatI18nConfig,
				keys: {
					...acc.keys,
					[key]: fullKey
				}
			}
		}

		const childConfig = Object.values(Language).reduce((langAcc, lang) => ({
			...langAcc,
			[lang]: messages[lang]?.[key] as IntlMessages
		}), {}) as I18nConfig<IntlMessages>

		const child = flattenAndGenerateKeys(childConfig, fullKey)

		return {
			i18nConfig: Object.values(Language).reduce((langAcc, lang) => ({
				...langAcc,
				[lang]: {
					...acc.i18nConfig[lang],
					...child.i18nConfig[lang]
				}
			}), {}) as FlatI18nConfig,
			keys: {
				...acc.keys,
				[key]: child.keys
			}
		}
	}, {
		i18nConfig: emptyFlatI18nConfig,
		keys: {} as AvailableKeys<K>
	})
}

export let messages: FlatI18nConfig = emptyFlatI18nConfig

const EventBus = new EventEmitter()

let counter = 0

export function defineI18n<K extends IntlMessages> (newMessages: I18nConfig<K>): AvailableKeys<K> {
	const prefix = (++counter).toString(16)

	const {
		i18nConfig,
		keys
	} = flattenAndGenerateKeys(newMessages, prefix)

	messages = Object.values(Language).reduce((acc, lang) => ({
		...acc,
		[lang]: {
			...acc[lang],
			...i18nConfig[lang]
		}
	}), messages)

	EventBus.emit('i18nMessagesChanged')

	return keys
}

export type Translate<K extends string = string> = {
	(key: K, values?: Record<string, PrimitiveType>): string
	(key: K, values?: Record<string, PrimitiveType | React.ReactElement | FormatXMLElementFn<string, any>>): string | ReactNode[]
}

export function useTranslate (): Translate<IntlKey> {
	const intl = useIntl()

	const translate = useCallback((key: string, params?: Record<string, PrimitiveType>) => {
		return intl.formatMessage({ id: key }, params)
	}, [intl])

	return translate as Translate<IntlKey>
}

interface I18nProviderProps {
	children: ReactNode | ReactNode[]
}

export function I18nProvider ({ children }: I18nProviderProps) {
	const [newMessages, setNewMessages] = useState(messages)
	const currentLanguage = useAppSelector(languageSelector)

	useEffect(() => {
		setNewMessages(messages)
		const onMessagesChanged = () => setNewMessages(messages)
		EventBus.on('i18nMessagesChanged', onMessagesChanged)
		return () => {
			EventBus.off('i18nMessagesChanged', onMessagesChanged)
		}
	}, [])

	return (
		<IntlProvider
			locale={currentLanguage}
			messages={newMessages[currentLanguage]}
			formats={formats(currentLanguage)}
		>
			{children}
		</IntlProvider>
	)
}
