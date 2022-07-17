import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO'
import { User } from '@modules/user/infra/typeorm/entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      ...data,
      id: Math.random(),
    })
    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email)

    return user
  }

  async findById(id: number): Promise<User> {
    const user = this.users.find((user) => user.id === id)

    return user
  }

  async save(user: User): Promise<User> {
    this.users.push(user)

    return user
  }
}

export { UsersRepositoryInMemory }
