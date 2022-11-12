import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { RefreshToken } from "./RefreshToken"

@Entity()
export class Store {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    StoreName: string

    @Column()
    AddressStreet: string

    @Column()
    Route:string

}
