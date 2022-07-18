import { User } from '@modules/user/infra/typeorm/entities/User'
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User>
  findById(id: number): Promise<User>
  save(user: User): Promise<User>
}

export { IUsersRepository }
