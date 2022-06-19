import { Router, Request, Response } from "express";
import { In } from "typeorm";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

import { User } from "@modules/user/entity/User";
import { Photo } from "@modules/user/entity/Photo";
import { AppError } from "@shared/errors/AppError";
import { AppDataSource } from "@shared/infra/typeorm/index";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import auth from "@config/auth";

interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string;
  };
}

const usersRoutes = Router();

const usersRepository = AppDataSource.getRepository(User);
const photosRepository = AppDataSource.getRepository(Photo);

usersRoutes.post("/create", async function (req: Request, res: Response) {
  const { email, firstName, lastName, password, age } = req.body;

  const userAlreadyExists = usersRepository.findOneBy({
    email: email,
  });

  if (userAlreadyExists) {
    throw new AppError("User already exists");
  }

  const passwordHash = await hash(password, 8);

  const newUser = usersRepository.create({
    email,
    firstName,
    lastName,
    password: passwordHash,
    age,
  });

  await usersRepository.save(newUser);

  res.status(201).send(newUser);
});

usersRoutes.get("/list", async function (req: Request, res: Response) {
  const users = await usersRepository.find({
    relations: {
      photos: true,
    },
  });

  res.send(users);
});

usersRoutes.get(
  "/get-by-id",
  ensureAuthenticated,
  async function (req: IGetUserAuthInfoRequest, res: Response) {
    const users = await usersRepository.findOneBy({
      id: parseInt(req.user.id),
    });

    res.send(users);
  }
);

usersRoutes.delete(
  "/delete-by-id",
  async function (req: Request, res: Response) {
    const { id } = req.body;
    const users = await usersRepository.delete({ id });

    return res.status(204).json(users);
  }
);

usersRoutes.get("/sessions", async function (req: Request, res: Response) {
  const { email, password } = req.body;
  const { expires_in_token, secret_token } = auth;

  const user = await usersRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Email or password incorrect!");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Email or password incorrect!");
  }

  const token = sign({}, secret_token, {
    subject: `${user.id}`,
    expiresIn: expires_in_token,
  });

  const tokenReturn = {
    token,
    user: {
      email: user.email,
      name: user.firstName,
    },
  };

  res.send(tokenReturn);
});

usersRoutes.post(
  "/add-photo",
  ensureAuthenticated,
  async function (req: IGetUserAuthInfoRequest, res: Response) {
    const userId = parseInt(req.user.id);
    const requestPhotos: Photo[] = req.body.photos;

    const user = await usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        photos: true,
      },
    });

    const photosToAdd = requestPhotos.map((photo) => {
      const photoCreated = photosRepository.create({
        name: photo.name,
        description: photo.description,
        filename: photo.filename,
        views: photo.views,
        isPublished: photo.isPublished,
        user: user,
      });

      photosRepository.save(photoCreated);

      return photoCreated;
    });

    if (user.photos) {
      user.photos = [...user.photos, ...photosToAdd];
    } else {
      user.photos = photosToAdd;
    }

    usersRepository.save(user);

    res.send();
  }
);

usersRoutes.delete(
  "/delete-photo",
  ensureAuthenticated,
  async function (req: IGetUserAuthInfoRequest, res: Response) {
    const userId = parseInt(req.user.id);
    const requestPhotosIdsToRemove: number[] = req.body.photosIdsToRemove;

    const photosToRemove = await photosRepository.find({
      where: {
        id: In(requestPhotosIdsToRemove),
      },
      relations: {
        user: true,
      },
    });

    if (!photosToRemove) {
      throw new AppError("Photos not found");
    }

    if (photosToRemove.some((photo) => photo.user.id !== userId)) {
      throw new AppError("You cannot delete another user's photo");
    }

    await photosRepository.remove(photosToRemove);

    res.send();
  }
);

export { usersRoutes };