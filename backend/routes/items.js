const express = require('express');
const router = express.Router();

const {
  addItems,
  getItems,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

router.post('/', addItems);
router.get('/', getItems);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;

