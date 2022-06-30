import { Response } from 'express'
import { container } from 'tsyringe'

import { IGetUserAuthInfoRequest } from '@shared/infra/http/middlewares/ensureAuthenticated'

import { UpdateUserPhotosUseCase } from './UpdateUserPhotosUseCase'

class UpdateUserPhotosController {
  async handle (request: IGetUserAuthInfoRequest, response: Response): Promise<Response> {
    const { photos } = request.body

    const updateUserImagesUseCase = container.resolve(UpdateUserPhotosUseCase)

    const userId = request.user.id

    const user = await updateUserImagesUseCase.execute({ photos, userId })

    return response.status(201).json(user)
  }
}

export { UpdateUserPhotosController }
