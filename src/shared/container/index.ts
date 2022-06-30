import { container } from 'tsyringe'

import '@shared/container/providers'

import { UsersRepository } from '@modules/user/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/user/repositories/IUsersRepository'

import { PhotosRepository } from '@modules/user/infra/typeorm/repositories/PhotosRepository'
import { IPhotosRepository } from '@modules/user/repositories/IPhotosRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IPhotosRepository>(
  'PhotosRepository',
  PhotosRepository
)
