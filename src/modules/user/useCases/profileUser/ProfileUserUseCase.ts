import { inject, injectable } from 'tsyringe'

import { IUserResponseDTO } from '@modules/user/dtos/IUserResponseDTO'
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository'
import {} from 'class-transformer'
import { User } from '@modules/user/infra/typeorm/entities/User'

@injectable()
class ProfileUserUseCase {
  private usersRepository: IUsersRepository
  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository
  }

  private withoutSensitiveData(user: User) {
    const excludeKeys = ['password', 'id']

    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !excludeKeys.includes(key))
    )
  }

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(parseInt(id))

    const userWithoutPassword = this.withoutSensitiveData(
      user
    ) as IUserResponseDTO

    return userWithoutPassword
  }
}

export { ProfileUserUseCase }
