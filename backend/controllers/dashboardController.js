const Product = require("../models/Product");
const Customer = require("../models/customer");
const Order = require("../models/order");

const getDashboardStats = async (req, res) => {
  try {
    // Total counts
    const products = await Product.countDocuments();

    const customers = await Customer.countDocuments();

    const orders = await Order.countDocuments();

    // Revenue calculation
    const orderData = await Order.find();

    const revenue = orderData.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    // Low stock products
    const lowStockProducts =
      await Product.countDocuments({
        quantity: { $lt: 10 },
      });

    res.status(200).json({
      success: true,
      data: {
        products,
        customers,
        orders,
        revenue,
        lowStockProducts,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};