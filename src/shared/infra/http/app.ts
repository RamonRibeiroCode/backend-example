import express, { NextFunction, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'

import cors from 'cors'

import uploadConfig from '@config/upload'

import { AppError } from '@shared/errors/AppError'

import { router } from './routes'
import swaggerFile from '../../../swagger.json'

const app = express()
app.use(express.json())

app.use(cors())
app.use(router)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use('/photos', express.static(`${uploadConfig.tmpFolder}/photos`))

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`
    })
  }
)

export { app }
