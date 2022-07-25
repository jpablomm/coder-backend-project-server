const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CartService {
  constructor() {
    this.carts = [];
  }

  async create(data) {
    const newCart = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.carts.push(newCart);
    return newCart;
  }

  async find() {
    return this.carts;
  }

  async findOne(id) {
    const cart = this.carts.find((item) => item.id === id);
    if (!cart) {
      throw boom.notFound('cart not found');
    }
    if (cart.isBlock) {
      throw boom.conflict('cart is blocked');
    }
    return cart;
  }

  async update(id, changes) {
    const index = this.carts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const cart = this.carts[index];
    this.carts[index] = {
      ...cart,
      ...changes,
    };
    return this.carts[index];
  }

  async delete(id) {
    const index = this.carts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('cart not found');
    }
    this.carts.splice(index, 1);
    return { id };
  }
}

module.exports = CartService;
