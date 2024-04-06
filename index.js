const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const productRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const cors = require('cors')

//middlewares
server.use(cors({
  exposedHeaders: ['X-Total-Count']
}))
server.use(express.json()); //to parse req.body
server.use("/products", productRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://anwar:1234@cluster0.e31gltg.mongodb.net/ecommmerce?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("database connected");
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.listen(8080, () => {
  console.log("server Started");
});
