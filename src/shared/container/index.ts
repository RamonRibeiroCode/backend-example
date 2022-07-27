import { container } from 'tsyringe'

import '@shared/container/providers'

import { PhotosRepository } from '@modules/user/infra/typeorm/repositories/PhotosRepository'
import { UsersRepository } from '@modules/user/infra/typeorm/repositories/UsersRepository'
import { IPhotosRepository } from '@modules/user/repositories/IPhotosRepository'
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IPhotosRepository>(
  'PhotosRepository',
  PhotosRepository
)
