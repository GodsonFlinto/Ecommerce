const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

//Creating Order - /api/v1/order
exports.createOrder = async (req, res, next) => {
  //console.log(req.body, 'Data')
  const cartItems = req.body;
  const amount = Number(
    cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)
  ).toFixed(2);
  //console.log(amount, 'Amount')
  const status = "pending";
  const order = await orderModel.create({ cartItems, amount, status });

  //Updating product stock
  cartItems.forEach(async (item) => {
    const product = await productModel.findById(item.product._id)
    product.stock = product.stock - item.quantity
    await product.save()
  });

  res.json({
    success: true,
    order,
  });
};
