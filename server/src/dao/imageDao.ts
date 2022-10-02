import { Image, FileStatus, ImageType } from '@prisma/client'
import { prisma } from '../prisma'

class ImageDao {

	static instance: ImageDao

	insert = (data: Omit<Image, 'imageId' | 'status' | 'createdAt' | 'deletedAt'>) => {
		return prisma.image.create({ data })
	}

	findById = (imageId: number) => {
		return prisma.image.findFirst({ where: { imageId, status: FileStatus.ACTIVE } })
	}

	findByUserId = (userId: number) => {
		return prisma.image.findMany({ where: { userId, status: FileStatus.ACTIVE } })
	}

	findByFileName = (fileName: string) => {
		return prisma.image.findFirst({ where: { fileName, status: FileStatus.ACTIVE } })
	}

	deleteImage = (imageId: number) => {
		return prisma.image.update({
			where: { imageId },
			data: {
				status: FileStatus.DELETED,
				deletedAt: new Date()
			}
		})
	}

	setAllAvatarsPrivate = (userId: number) => {
		return prisma.image.updateMany({
			where: {
				userId,
				public: true,
				imageType: ImageType.AVATAR
			},
			data: {
				public: false
			}
		})
	}

	/* STATIC */

	static getInstance = () => {
		if (ImageDao.instance == null) {
			ImageDao.instance = new ImageDao()
		}

		return ImageDao.instance
	}
}

export default ImageDao.getInstance()
