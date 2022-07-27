// START OF THE APPLICATION, YOU NEED TO IMPORT THIS MODULES HERE
import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'
import '@shared/container'

import { app } from '@shared/infra/http/app'
import { AppDataSource } from '@shared/infra/typeorm'

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.APP_PORT, () =>
      console.log(`Server is running on PORT ${process.env.APP_PORT}`)
    )
  })
  .catch((error) => console.log(error))
