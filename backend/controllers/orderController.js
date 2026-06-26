const Order = require("../models/order");
const Product = require("../models/Product");

// GET ALL ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .select("customer items totalAmount status createdAt")
      .populate({
        path: "customer",
        select: "name",
      })
      .populate({
        path: "items.product",
        select: "name price",
      })
      .lean();

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

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({
        message: "Customer and items are required",
      });
    }

    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);

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

      // Reduce stock
      product.quantity -= item.quantity;
      await product.save();

      // Save product price in order
      item.price = product.price;

      // Calculate total
      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      customer,
      items,
      totalAmount,
      status: "Pending",
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("customer")
      .populate("items.product");

    res.status(201).json(populatedOrder);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE ORDER
const deleteOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Restore stock
    for (const item of order.items) {

      const product = await Product.findById(item.product);

      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getOrders,
  createOrder,
  deleteOrder,
};