import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@config/upload'
import { CreateUserController } from '@modules/user/useCases/createUser/CreateUserController'
import { ProfileUserController } from '@modules/user/useCases/profileUser/ProfileUserController'
import { UpdateUserPhotosController } from '@modules/user/useCases/updateUserImages/UpdateUserPhotosController'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const uploadPhotos = multer(uploadConfig)

const usersRoutes = Router()

const createUserController = new CreateUserController()
const updateUserPhotosController = new UpdateUserPhotosController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/create', createUserController.handle)

usersRoutes.patch(
  '/photos',
  ensureAuthenticated,
  uploadPhotos.array('photos'),
  updateUserPhotosController.handle
)

usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle)

export { usersRoutes }
