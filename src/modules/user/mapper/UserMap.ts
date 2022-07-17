import { classToClass } from 'class-transformer'
import { IUserResponseDTO } from '../dtos/IUserResponseDTO'
import { User } from '../infra/typeorm/entities/User'

class UserMap {
  static toDTO({
    email,
    firstName,
    lastName,
    age,
    photos,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      firstName,
      lastName,
      age,
      photos,
    })

    return user
  }
}

export { UserMap }
