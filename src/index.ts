import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from "express"
import { Request, Response } from "express";
import { RegisterRequest } from "./models/request/register.request";
import { UserModel } from "./models/UserModel";
import { StoreInventory } from "./entity/StoreInventory";
import { Store } from "./entity/Store";

const cors = require('cors');
const bodyParser = require('body-parser');

// Mount Routes
const routes = require('./routes/routes');


const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/', routes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello There");
});


app.listen(4000, () => console.log("Server running on ", 4000));


