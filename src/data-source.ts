import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/Photo";
import { User } from "./entity/User";

import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER_NAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Photo],
  migrations: [],
  subscribers: [],
});
