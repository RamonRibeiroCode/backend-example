import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@modules/user/repositories/IUsersRepository'
// import { ICreatePhotoDTO } from '@modules/user/dtos/ICreatePhotoDTO'
import { IPhotosRepository } from '@modules/user/repositories/IPhotosRepository'
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider'

interface IRequest {
  // photos: ICreatePhotoDTO[]
  userId: string
  photosFileName: string[]
}

@injectable()
class UpdateUserPhotosUseCase {
  private userRepository: IUsersRepository
  private photosRepository: IPhotosRepository
  private storageProvider: IStorageProvider

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository,
    @inject('PhotosRepository')
    photosRepository: IPhotosRepository,
    @inject('StorageProvider')
    storageProvider: IStorageProvider
  ) {
    this.userRepository = userRepository
    this.photosRepository = photosRepository
    this.storageProvider = storageProvider
  }

  async execute({ userId, photosFileName }: IRequest) {
    const user = await this.userRepository.findById(parseInt(userId))

    const formattedPhotos = photosFileName.map((photoFileName) => ({
      filename: photoFileName,
    }))

    const newPhotos = await this.photosRepository.create(formattedPhotos)

    if (user.photos.length) {
      const photosFileName = user.photos.map((photo) => photo.filename)
      await this.storageProvider.deleteAll(photosFileName, 'photos')
    }

    await this.storageProvider.saveAll(photosFileName, 'photos')

    user.photos = newPhotos

    await this.userRepository.save(user)
  }
}

export { UpdateUserPhotosUseCase }
