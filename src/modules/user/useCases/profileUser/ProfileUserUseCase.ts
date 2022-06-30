import { inject, injectable } from 'tsyringe'

import { IUserResponseDTO } from '@modules/user/dtos/IUserResponseDTO'
import { UserMap } from '@modules/user/mapper/UserMap'
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository'

@injectable()
class ProfileUserUseCase {
  private usersRepository: IUsersRepository
  constructor (
    @inject('UsersRepository')
      usersRepository: IUsersRepository
  ) {
    this.usersRepository = usersRepository
  }

  async execute (id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(parseInt(id))

    return UserMap.toDTO(user)
  }
}

export { ProfileUserUseCase }
