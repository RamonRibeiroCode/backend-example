
import { User } from '@modules/user/infra/typeorm/entities/User'
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO'

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>
    findByEmail(email: string): Promise<User>
}

export { IUsersRepository }
