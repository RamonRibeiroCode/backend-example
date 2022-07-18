interface IStorageProvider {
  save(file: string, folder: string): Promise<string>
  saveAll(file: string[], folder: string): Promise<string[]>
  delete(file: string, folder: string): Promise<void>
  deleteAll(file: string[], folder: string): Promise<void>
}

export { IStorageProvider }
