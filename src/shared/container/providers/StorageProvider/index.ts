import { container } from 'tsyringe'

import { LocalStorageProvider } from './implemetations/LocalStorageProvider'
import { IStorageProvider } from './IStorageProvider'

const diskStorage = {
  local: LocalStorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk]
)
