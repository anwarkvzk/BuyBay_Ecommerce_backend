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
  //Todo : we have to try with multiple categoryand brands after change in front-end
  let query = Product.find({});
  let totalProductsQuery = Product.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const TotalDocs = await totalProductsQuery.count().exec();
  console.log({TotalDocs})

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    const docs = await query.exec();
    res.set("X-Total-Count", TotalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};
