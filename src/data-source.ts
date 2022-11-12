import "reflect-metadata"
import { DataSource } from "typeorm"
import { StoreInventory } from "./entity/StoreInventory"
import { User } from "./entity/User"
import { Store } from "./entity/Store"
import { RefreshToken } from "./entity/RefreshToken"

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "20.121.52.43",
    port: 1433,
    username: "sa",
    password: "104Global@dmin",
    database: "104DATA",
    synchronize: false,
    logging: false,
    entities: [StoreInventory,User,RefreshToken, Store],
    migrations: [],
    subscribers: [],
    options: { encrypt: false },
    extra: {
        poolSize: 50,
        connectionTimeoutMillis: 200000,
        query_timeout: 100000,
        statement_timeout: 100000
      },
    
})

AppDataSource.
    initialize().
    then(()=>{
        console.log('database connected')
    },error=>console.log("here",error));
