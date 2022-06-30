import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const {
      email,
      firstName,
      lastName,
      password,
      age
    } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      email,
      firstName,
      lastName,
      password,
      age
    })

    return response.status(201).json(user)
  }
}

export { CreateUserController }
