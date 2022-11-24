
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { RefreshToken } from "./RefreshToken"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    username:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    age: number

    @Column()
    idStore: number

    @Column()
    idProfile: number

    @Column()
    createdBy: number

    @OneToMany(type=>RefreshToken, refreshToken => refreshToken.user)
    refreshToken:RefreshToken

}