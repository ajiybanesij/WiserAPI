const express = require('express');
const router = express.Router();

const controller = require('../controllers/airPlane');

router.get('/', controller.FindAll);
router.get('/:id', controller.FindById);
router.post('/', controller.Create);
router.put('/', controller.Update);
router.put('/moving', controller.Moving);
router.delete('/', controller.Delete);

module.exports = router;