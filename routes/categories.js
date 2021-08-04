const connectDB = require("../services/db");
const categories = require("../models/categories");

module.exports = (app) => {
  app.post("/categories/list", async ({ body }, res) => {
    await connectDB(true);
    categories.find(
      body.parent ? { parent: body.parent } : {},
      function (dbErr, dbRes) {
        connectDB(false);
        res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: dbRes }));
      }
    );
  });
  app.post("/categories/get", async ({ body }, res) => {
    await connectDB(true);
    categories.findOne({ _id: body._id }, function (dbErr, dbRes) {
      connectDB(false);
      res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: dbRes }));
    });
  });
  app.post("/categories/edit", async ({ body }, res) => {
    await connectDB(true);
    categories.findOneAndUpdate({ _id: body._id }, body, function (dbErr) {
      connectDB(false);
      res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: "ok" }));
    });
  });
  app.post("/categories/remove", async ({ body }, res) => {
    await connectDB(true);
    categories.remove({ _id: body._id }, function (dbErr) {
      connectDB(false);
      res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: "ok" }));
    });
  });
  app.post("/categories/add", async ({ body }, res) => {
    await connectDB(true);
    categories.create(body, function (dbErr) {
      connectDB(false);
      res.send(JSON.stringify(dbErr ? { error: dbErr } : { result: "ok" }));
    });
  });
};
