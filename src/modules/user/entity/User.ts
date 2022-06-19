import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Photo } from '@modules/user/entity/Photo'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    email: string

  @Column({ name: 'first_name' })
    firstName: string

  @Column({ name: 'last_name' })
    lastName: string

  @Column()
    password: string

  @Column()
    age: number

  @OneToMany(() => Photo, (photo) => photo.user, { onDelete: 'CASCADE' })
    photos: Photo[]

  @CreateDateColumn({ name: 'created_at', type: 'datetime', nullable: false })
    createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: false })
    updatedAt: Date
}
