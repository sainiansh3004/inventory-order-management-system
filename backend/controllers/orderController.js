const Order = require("../models/order");
const Product = require("../models/Product");

// GET ALL ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer")
      .populate("items.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(
        item.product
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      product.quantity -= item.quantity;

      await product.save();

      totalAmount +=
        product.price * item.quantity;

      item.price = product.price;
    }

    const order = await Order.create({
      customer,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getOrders,
  createOrder,
};