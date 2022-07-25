const express = require('express');
const CartService = require('../services/cart.service');

const router = express.Router();

const cartService = new CartService();

router.get('/', async (req, res) => {
  const products = await cartService.find();
  res.json(products);
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await cartService.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await cartService.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await cartService.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data: body,
    id,
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await cartService.delete(id);
  res.json(response);
});

module.exports = router;
