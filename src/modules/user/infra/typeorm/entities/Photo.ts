import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

import { User } from '@modules/user/infra/typeorm/entities/User'

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  filename: string

  @ManyToOne(() => User, (user) => user.photos)
  user: User
}
