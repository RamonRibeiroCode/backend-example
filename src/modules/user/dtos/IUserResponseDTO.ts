import { Photo } from '../infra/typeorm/entities/Photo'

interface IUserResponseDTO {
    email: string
    firstName: string
    lastName: string
    age: number
    photos: Photo[]
  }

export { IUserResponseDTO }
