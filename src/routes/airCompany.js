const express = require('express');
const router = express.Router();

const controller = require('../controllers/airCompany');

router.get('/', controller.FindAll);
router.get('/:id', controller.FindById);
router.post('/', controller.Create);
router.put('/', controller.Update);
router.delete('/', controller.Delete);

module.exports = router;
