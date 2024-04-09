var express = require('express');
var router = express.Router();
var inventoryController = require('../controllers/inventoryController');


/* GET home page. */
router.get('/inventory', inventoryController.Get);
router.get('/inventory/limit/:limit', inventoryController.Get);
router.get('/inventory/:id', inventoryController.GetDetail);
router.post('/inventory', inventoryController.CreateData);
router.put('/inventory', inventoryController.UpdateData);
router.delete('/inventory', inventoryController.DeleteData);

module.exports = router;
