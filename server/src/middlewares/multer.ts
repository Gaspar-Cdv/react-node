import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import fs from 'fs'
import multer, { Options } from 'multer'
import { UnprocessableEntityError } from '../types/errors'
import tokenService from '../services/tokenService'

const ROOT_DIR = 'upload'

const isImage = (mimetype: string) => mimetype.startsWith('image/')
const isVideo = (mimetype: string) => mimetype.startsWith('video/')
const isAudio = (mimetype: string) => mimetype.startsWith('audio/')
const isPdf = (mimetype: string) => mimetype === 'application/pdf'
const isText = (mimetype: string) => mimetype === 'text/plain'

/**
 * Create a Multer middleware.
 * @param dirName the name of the root directory
 * @param filter a callback to determine which files can be upload or not from its mimetype
 * @param getExtension a callback to determine the extension of the file from its mimetype
 * @param limits define the limits (e.g maximum file size in kb, max file count,...)
 */
const createUpload = (
	dirName: string,
	filter: (mimetype: string) => boolean,
	getExtension?: (mimetype: string) => string,
	limits: Options['limits'] = {
		fileSize: 2048 * 1024, // 2MB
		files: 2
	}
) => {
	return multer({
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				const path = getDatePath(dirName)
				cb(null, path)
			},
			filename: (req, file, cb) => {
				let fileName = tokenService.generateToken()
				if (getExtension != null) {
					fileName = [fileName, getExtension(file.mimetype)].join('.')
				}
				cb(null, fileName)
			}
		}),
		limits,
		fileFilter: (req, file, callback) => {
			if (filter(file.mimetype)) {
				callback(null, true)
			} else {
				callback(new UnprocessableEntityError(ErrorMessage.INVALID_FORMAT))
			}
		}
	})
}

/**
 * Get a path from the current date.\
 * If the path doesn't exist yet, it is created.\
 * E.g. on Oct. 1th 2022, path will be
 * ```txt
 * upload/${dir}/2022/10/01
 * ```
 */
const getDatePath = (dir: string) => {
	const dateTime = new Date()
	const [date, _time] = dateTime.toISOString().split('T')
	const path = [ROOT_DIR, dir, ...date.split('-')].join('/')

	fs.mkdirSync(path, { recursive: true })

	return path
}

/**
 * Get the extension from the subtype of a mimetype.\
 * E.g. for application/pdf, extension will be pdf.
 */
const getExtensionFromMimeType = (mimetype: string): string => {
	const [_rootType, extension] = mimetype.split('/')
	return extension
}

export const uploadImage = createUpload('image', isImage, getExtensionFromMimeType)
export const uploadVideo = createUpload('video', isVideo, getExtensionFromMimeType)
export const uploadAudio = createUpload('audio', isAudio, getExtensionFromMimeType)
export const uploadPdf = createUpload('pdf', isPdf, getExtensionFromMimeType)
export const uploadText = createUpload('text', isText, () => 'txt')
