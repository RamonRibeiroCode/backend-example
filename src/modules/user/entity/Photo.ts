import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '@modules/user/entity/User'

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    length: 100
  })
    name: string

  @Column('text')
    description: string

  @Column()
    filename: string

  @Column('double')
    views: number

  @Column({ name: 'is_published' })
    isPublished: boolean

  @ManyToOne(() => User, (user) => user.photos)
    user: User
}
