const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const productRouters = require("./routes/Product");

//middlewares
server.use(express.json()); //to parse req.body
server.use("/products", productRouters.router);

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
