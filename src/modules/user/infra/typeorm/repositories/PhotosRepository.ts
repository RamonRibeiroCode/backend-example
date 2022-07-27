import { Repository } from 'typeorm'

import { ICreatePhotoDTO } from '@modules/user/dtos/ICreatePhotoDTO'
import { Photo } from '@modules/user/infra/typeorm/entities/Photo'
import { IPhotosRepository } from '@modules/user/repositories/IPhotosRepository'
import { AppDataSource } from '@shared/infra/typeorm'

class PhotosRepository implements IPhotosRepository {
  private repository: Repository<Photo>

  constructor() {
    this.repository = AppDataSource.getRepository(Photo)
  }

  async create(photos: ICreatePhotoDTO[]) {
    const newPhotos = this.repository.create(photos)

    return this.repository.save(newPhotos)
  }
}

export { PhotosRepository }
