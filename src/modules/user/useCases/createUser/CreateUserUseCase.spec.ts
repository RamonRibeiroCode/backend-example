import { UsersRepositoryInMemory } from '@modules/user/repositories/in-memory/UsersRepositoryInMemory'

import { CreateUserUseCase } from './CreateUserUseCase'

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

describe('Create User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to create a new user', async () => {
    const newUser = await createUserUseCase.execute({
      email: 'email@example.com',
      firstName: 'First Name',
      lastName: 'Last Name',
      age: 20,
      password: '123456',
    })

    const userInMemory = await usersRepositoryInMemory.findByEmail(
      newUser.email
    )

    expect(userInMemory).toHaveProperty('id')
  })
})
