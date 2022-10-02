import { Router } from 'express'
import { Req } from '../types/requestResponse'
import imageService from '../services/imageService'
import { uploadImage } from '../middlewares/multer'
import { authenticated } from '../middlewares/authenticated'

const router = Router()

const FILE_FIELD_NAME = 'file'

interface UploadFileRequest {
	name: string
}

router.post('/uploadAvatar', authenticated, uploadImage.single(FILE_FIELD_NAME), async ({ body, file, userId }: Req<UploadFileRequest>, res) => {
	await imageService.uploadAvatar(userId!, body.name, file)
	res.sendStatus(200)
})

export default router
