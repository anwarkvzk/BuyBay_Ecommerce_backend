const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  //this product we haave to get from API body
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllProducts = async (req, res) => {
  //here we need all query string
  const query = Product.find({});
  if (req.query._sort && req.query._order) {
    await query.sort({ [req.query._sort]: req.query._order });
  }
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
