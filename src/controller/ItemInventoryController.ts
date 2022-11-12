import { Request, Response } from "express";
import e = require("express");
import { AppDataSource } from "../data-source";
import { StoreInventory } from "../entity/StoreInventory";



// @desc     Get all StoreInventory data
// @route    GET /getiteminventory
// @access   Public

exports.getItemInventory = async (req: Request, res: Response, next) => {

    const repo = await AppDataSource.getRepository(StoreInventory);
    const manager = await AppDataSource.manager;
    const sp = await manager.query('EXEC uspStoreInventory')
    // const sp = await repo.query('');

    res.status(200).json({ data: sp });
}

// @desc     Get StoreInventory by id
// @route    GET /getiteminventory/:id
// @access   Public

exports.getItemInventoryById = async (req: Request, res: Response, next) => {
    const repo = await AppDataSource.getRepository(StoreInventory);
    const sp = await repo.query('EXEC GetStoreInventory');

    const result = sp.find(store => store.ListID == req.params.id);
    if (!result) res.status(404).json({ msg: "No data found" });
    else res.status(200).json({ data: result });
}

// @desc     Get StoreInventory by id
// @route    GET /getiteminventory/:id
// @access   Public

exports.updateItemInventoryById = async (req: Request, res: Response, next) => {
    const repo = await AppDataSource.getRepository(StoreInventory);

    const sp = await repo.query(`EXEC	[uspUpdatemnm]
    @ListID = '${req.params.id}',
    @min = ${req.body.MinStore},
    @max = ${req.body.MaxStore}`);
    return res.status(201).json({ msg: 'Updated Successfully' })

}