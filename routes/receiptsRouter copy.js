var express = require('express');
var router = express.Router();
var receiptsController = require('../controllers/receiptsController');


/* GET home page. */
router.get('/receipts', receiptsController.Get);
router.get('/receipts/limit/:limit', receiptsController.Get);
router.get('/receipts/:id', receiptsController.GetDetail);
router.post('/receipts', receiptsController.CreateData);
router.put('/receipts', receiptsController.UpdateData);
router.delete('/receipts', receiptsController.DeleteData);

module.exports = router;
