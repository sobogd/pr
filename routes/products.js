const connectDB = require("../services/db");
const products = require("../models/products");

module.exports = (app) => {
  app.post("/products/list", async ({ body }, res) => {
    await connectDB(true);
    products.find(
      body.parent ? { parent: body.parent } : {},
      function (dbErr, dbRes) {
        connectDB(false);
        res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: dbRes }));
      }
    );
  });
  app.post("/products/get", async ({ body }, res) => {
    await connectDB(true);
    products.findOne({ _id: body._id }, function (dbErr, dbRes) {
      connectDB(false);
      res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: dbRes }));
    });
  });
  app.post("/products/edit", async ({ body }, res) => {
    await connectDB(true);
    products.findOneAndUpdate({ _id: body._id }, body, function (dbErr) {
      connectDB(false);
      res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: "ok" }));
    });
  });
  app.post("/products/remove", async ({ body }, res) => {
    await connectDB(true);
    products.remove({ _id: body._id }, function (dbErr) {
      connectDB(false);
      res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: "ok" }));
    });
  });
  app.post("/products/add", async ({ body }, res) => {
    await connectDB(true);
    products.create(body, function (dbErr) {
      connectDB(false);
      res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: "ok" }));
    });
  });
};
