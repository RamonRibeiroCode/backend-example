import { Response, Express } from 'express'
import { container } from 'tsyringe'

import { IGetUserAuthInfoRequest } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { UpdateUserPhotosUseCase } from './UpdateUserPhotosUseCase'

class UpdateUserPhotosController {
  async handle (request: IGetUserAuthInfoRequest, response: Response): Promise<Response> {
    const files = request.files as Express.Multer.File[]
    const photosFileName = files.map(file => file.filename)

    const updateUserImagesUseCase = container.resolve(UpdateUserPhotosUseCase)

    const userId = request.user.id

    const user = await updateUserImagesUseCase.execute({ photosFileName, userId })

    return response.status(201).json(user)
  }
}

export { UpdateUserPhotosController }
