import { Request, Response } from "express";
import e = require("express");
import { AppDataSource } from "../data-source";
import { Store } from "../entity/Store";



// @desc     Get all StoreInventory data
// @route    GET /getiteminventory
// @access   Public

exports.allStore = async (req: Request, res: Response, next) => {

    console.log("here in all store")
    const repo = await AppDataSource.getRepository(Store);
    const manager = await AppDataSource.manager;
    const sp = await manager.query('select * from stores')
    // const sp = await repo.query('');
    console.log("here end all store")


    res.status(200).json({ data: sp });
}