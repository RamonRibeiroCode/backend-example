import { Response } from 'express'
import { container } from 'tsyringe'

import { ProfileUserUseCase } from './ProfileUserUseCase'

import { IGetUserAuthInfoRequest } from '@shared/infra/http/middlewares/ensureAuthenticated'

class ProfileUserController {
  async handle(
    request: IGetUserAuthInfoRequest,
    response: Response
  ): Promise<Response> {
    const { id } = request.user
    const profileUserUseCase = container.resolve(ProfileUserUseCase)

    const user = await profileUserUseCase.execute(id)
    return response.json(user)
  }
}

export { ProfileUserController }
