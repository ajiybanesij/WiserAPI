const express = require('express');
const router = express.Router();

const controller = require('../controllers/flight');

router.get('/', controller.FindAll);
router.get('/id/:id', controller.FindById);
router.get('/staus/:status', controller.FindByStatus);
router.get('/active', controller.FindActive);
router.get('/detail/:companyName/:status', controller.FindByCompanyAndStatus);
router.post('/', controller.Create);
router.put('/', controller.Update);
router.delete('/', controller.Delete);

module.exports = router;