import * as dotenv from "dotenv";
import * as express from "express";
import { Request, Response } from "express";

import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const userRepository = AppDataSource.getRepository(User);

    const app = express();
    app.use(express.json());

    app.get("/users", async function (req: Request, res: Response) {
      const users = await userRepository.find({
        relations: {
          photos: true,
        },
      });
      res.json(users);
    });

    app.listen(3000);
  })
  .catch((error) => console.log(error));
