import { inject, injectable } from 'tsyringe'

import { User } from '@modules/user/infra/typeorm/entities/User'
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { hash } from 'bcrypt'

interface IRequest {
  email: string
  firstName: string
  lastName: string
  password: string
  age: number
}

@injectable()
class CreateUserUseCase {
  private userRepository: IUsersRepository

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository
  ) {
    this.userRepository = userRepository
  }

  async execute({
    email,
    firstName,
    lastName,
    password,
    age,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists!')
    }

    const passwordHash = await hash(password, 8)

    const user = await this.userRepository.create({
      email,
      firstName,
      lastName,
      password: passwordHash,
      age,
    })

    return user
  }
}

export { CreateUserUseCase }
