const express = require('express');
const router = express.Router();
const { getItemInventory, getItemInventoryById, updateItemInventoryById } = require('../controller/ItemInventoryController');
const { allStore } = require('../controller/StoreController');
const { register, login, refreshToken } = require('../controller/AuthController');
const {createEmployee}=require("../controller/EmployeeController")
const {getItemsbyPurchaseOrder,getItemsbyPurchaseOrderList,getPurchaseOrderNewItem} = require('../controller/PurchaseOrderController');

// Store
router.route('/iteminventory').get(getItemInventory);
router.route('/iteminventory/:id').get(getItemInventoryById).post(updateItemInventoryById);
router.route('/get-stores/').get(allStore);

// Purchase Order
router.route('/purchaseorder/list').get(getItemsbyPurchaseOrderList);
router.route('/purchaseorder/list/:id').get(getItemsbyPurchaseOrder);
router.route('/purchaseorder/nwitems').get(getPurchaseOrderNewItem);
router.route('/purchaseorder/sendpo')

// Register
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/refresh-token').post(refreshToken);


//Create User
router.route('/create/user').post(createEmployee)
module.exports = router;