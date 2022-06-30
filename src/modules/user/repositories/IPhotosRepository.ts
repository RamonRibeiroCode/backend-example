
import { Photo } from '@modules/user/infra/typeorm/entities/Photo'
import { ICreatePhotoDTO } from '@modules/user/dtos/ICreatePhotoDTO'

interface IPhotosRepository {
    create(photos: ICreatePhotoDTO[]): Promise<Photo[]>
}

export { IPhotosRepository }
