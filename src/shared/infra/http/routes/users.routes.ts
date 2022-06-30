import { Router } from 'express'
import multer from 'multer'

import { CreateUserController } from '@modules/user/useCases/createUser/CreateUserController'
import { UpdateUserPhotosController } from '@modules/user/useCases/updateUserImages/UpdateUserPhotosController'
import { ProfileUserController } from '@modules/user/useCases/profileUser/ProfileUserController'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

import uploadConfig from '@config/upload'

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

// usersRoutes.get('/list', async function (req: Request, res: Response) {
//   const users = await usersRepository.find({
//     relations: {
//       photos: true
//     }
//   })

//   res.send(users)
// })

// usersRoutes.get(
//   '/get-by-id',
//   ensureAuthenticated,
//   async function (req: IGetUserAuthInfoRequest, res: Response) {
//     const users = await usersRepository.findOneBy({
//       id: parseInt(req.user.id)
//     })

//     res.send(users)
//   }
// )

// usersRoutes.delete(
//   '/delete-by-id',
//   async function (req: Request, res: Response) {
//     const { id } = req.body
//     const users = await usersRepository.delete({ id })

//     return res.status(204).json(users)
//   }
// )

// usersRoutes.get('/sessions', async function (req: Request, res: Response) {
//   const { email, password } = req.body
//   const { expiresInToken, secretToken } = auth

//   const user = await usersRepository.findOneBy({
//     email
//   })

//   if (!user) {
//     throw new AppError('Email or password incorrect!')
//   }

//   const passwordMatch = await compare(password, user.password)

//   if (!passwordMatch) {
//     throw new AppError('Email or password incorrect!')
//   }

//   const token = sign({}, secretToken, {
//     subject: `${user.id}`,
//     expiresIn: expiresInToken
//   })

//   const tokenReturn = {
//     token,
//     user: {
//       email: user.email,
//       name: user.firstName
//     }
//   }

//   res.send(tokenReturn)
// })

// usersRoutes.post(
//   '/add-photo',
//   ensureAuthenticated,
//   async function (req: IGetUserAuthInfoRequest, res: Response) {
//     const userId = parseInt(req.user.id)
//     const requestPhotos: Photo[] = req.body.photos

//     const user = await usersRepository.findOne({
//       where: {
//         id: userId
//       },
//       relations: {
//         photos: true
//       }
//     })

//     const photosToAdd = requestPhotos.map((photo) => {
//       const photoCreated = photosRepository.create({
//         name: photo.name,
//         description: photo.description,
//         filename: photo.filename,
//         views: photo.views,
//         isPublished: photo.isPublished,
//         user
//       })

//       photosRepository.save(photoCreated)

//       return photoCreated
//     })

//     if (user.photos) {
//       user.photos = [...user.photos, ...photosToAdd]
//     } else {
//       user.photos = photosToAdd
//     }

//     usersRepository.save(user)

//     res.send()
//   }
// )

// usersRoutes.delete(
//   '/delete-photo',
//   ensureAuthenticated,
//   async function (req: IGetUserAuthInfoRequest, res: Response) {
//     const userId = parseInt(req.user.id)
//     const requestPhotosIdsToRemove: number[] = req.body.photosIdsToRemove

//     const photosToRemove = await photosRepository.find({
//       where: {
//         id: In(requestPhotosIdsToRemove)
//       },
//       relations: {
//         user: true
//       }
//     })

//     if (!photosToRemove) {
//       throw new AppError('Photos not found')
//     }

//     if (photosToRemove.some((photo) => photo.user.id !== userId)) {
//       throw new AppError('You cannot delete another users photo')
//     }

//     await photosRepository.remove(photosToRemove)

//     res.send()
//   }
// )

export { usersRoutes }
