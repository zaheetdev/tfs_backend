import { Request, Response } from "express";
import { AppDataSource } from "../data-source";


// @desc     Get all PurchaseOrder data
// @route    GET /purchaseorder/list
// @access   Public

exports.getItemsbyPurchaseOrderList = async (req: Request, res: Response, next) => {
    const manager = await AppDataSource.manager;
    const result = await manager.query('exec uspGetPOList');

    res.status(200).json({ data: result });
}


// @desc     Get Order by POId
// @route    GET /purchaseorder/list/:id
// @access   Public

exports.getItemsbyPurchaseOrder = async (req: Request, res: Response, next) => {
    const manager = await AppDataSource.manager;
    const result = await manager.query(`exec GetPODetails @idPO = ${req.params.id}`);

    res.status(200).json({ data: result });
}


// @desc     Get Purchase Order 
// @route    GET /purchaseorder/nwitems
// @access   Public

exports.getPurchaseOrderNewItem = async (req: Request, res: Response, next) => {
    const manager = await AppDataSource.manager;
    const result = await manager.query('select * from vBuildPurchaseOrder');
    res.status(200).json({ data: result });
}

exports.sendPo = async (req: Request, res: Response, next) => {
    const manager = await AppDataSource.manager;
    const result = await manager.query(`exec GetPODetails @@StoreNumber = ${req.params.id}`);

    res.status(200).json({ data: result });
}