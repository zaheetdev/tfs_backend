import {Entity,PrimaryGeneratedColumn,Column} from "typeorm";

@Entity('StoreInventory')
export class StoreInventory{
    @PrimaryGeneratedColumn()
    IdInventory:number;

    @Column()
    ListID:string;

    @Column()
    ItemNumber:number;

    @Column({name:'Desc1'})
    ItemName:string;

    @Column({name:'Desc2'})
    ItemDesc:string;

    @Column()
    StoreNumber:number;

    @Column()
    Cost:number;

    @Column({name:'QuantityOnOrder'})
    OnOrder:number;

    @Column()
    OnHand:number;

    @Column({name:'Total_Cost'})
    TotalCost:number;
    
    @Column()
    ReorderPoint:number;

    @Column()
    MaxStore:number;

    @Column()
    UpdateDateTime:Date;

    @Column()
    BuildDateTime:Date;
}
