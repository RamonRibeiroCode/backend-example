import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/user/repositories/IUsersRepository'
import { ICreatePhotoDTO } from '@modules/user/dtos/ICreatePhotoDTO'
import { IPhotosRepository } from '@modules/user/repositories/IPhotosRepository'

interface IRequest {
  photos: ICreatePhotoDTO[]
  userId: string
}

@injectable()
class UpdateUserPhotosUseCase {
  private userRepository: IUsersRepository
  private photosRepository: IPhotosRepository

  constructor (
    @inject('UsersRepository')
      userRepository: IUsersRepository,
    @inject('PhotosRepository')
      photosRepository: IPhotosRepository
  ) {
    this.userRepository = userRepository
    this.photosRepository = photosRepository
  }

  async execute ({ photos, userId }: IRequest) {
    const user = await this.userRepository.findById(parseInt(userId))
    const newPhotos = await this.photosRepository.create(photos)

    user.photos = newPhotos

    await this.userRepository.save(user)
  }
}

export { UpdateUserPhotosUseCase }
