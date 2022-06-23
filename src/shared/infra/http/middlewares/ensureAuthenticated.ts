import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '../../../../config/auth'
import { AppError } from '../../../errors/AppError'

interface IPayload {
  sub: string;
}

interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string;
  };
}

export async function ensureAuthenticated (
  request: IGetUserAuthInfoRequest,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secretToken) as IPayload

    request.user = {
      id: userId
    }

    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
