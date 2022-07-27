import { ICreatePhotoDTO } from '@modules/user/dtos/ICreatePhotoDTO'
import { Photo } from '@modules/user/infra/typeorm/entities/Photo'

interface IPhotosRepository {
  create(photos: ICreatePhotoDTO[]): Promise<Photo[]>
}

export { IPhotosRepository }
