import imageDao from '../dao/imageDao'
import { ForbiddenError, NotFoundError, UnprocessableEntityError } from '../types/errors'
import { resolve } from 'path'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import fs from 'fs'
import { uploadFileValidationSchema } from '@title/common/build/services/validation'
import { ImageType } from '@prisma/client'
import { prisma } from '../prisma'

export class ImageService {
	static instance: ImageService

	uploadAvatar = async (userId: number, name: string, file?: Express.Multer.File) => {
		try {
			uploadFileValidationSchema.validateSync({ name, file })
		} catch (e) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		const { destination, filename, mimetype } = file!

		prisma.$transaction([
			imageDao.setAllAvatarsPrivate(userId),
			imageDao.insert({
				userId,
				name,
				path: destination,
				fileName: filename,
				mimetype,
				public: true,
				imageType: ImageType.AVATAR
			})
		])
	}

	/* PRIVATE */

	buildPath = (path: string, fileName: string) => {
		return [resolve(__dirname, '../../'), path, fileName].join('/')
	}


	/* STATIC */

	static getInstance (): ImageService {
		if (!ImageService.instance) {
			ImageService.instance = new ImageService()
		}

		return ImageService.instance
	}
}

export default ImageService.getInstance()
