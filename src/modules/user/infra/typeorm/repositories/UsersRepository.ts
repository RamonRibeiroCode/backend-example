import { Repository } from 'typeorm'

import { IUsersRepository } from '@modules/user/repositories/IUsersRepository'
import { User } from '@modules/user/infra/typeorm/entities/User'
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO'

import { AppDataSource } from '@shared/infra/typeorm'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({ email, firstName, lastName, password, age }: ICreateUserDTO) {
    const newUser = this.repository.create({
      email,
      firstName,
      lastName,
      password,
      age,
    })

    return this.repository.save(newUser)
  }

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: {
        email,
      },
      relations: ['photos'],
    })
  }

  async findById(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: ['photos'],
    })
  }

  async save(user: User) {
    return this.repository.save(user)
  }
}

export { UsersRepository }
