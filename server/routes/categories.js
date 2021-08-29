const connectDB = require("../services/db");
const categories = require("../models/categories");
const fs = require("fs");
const stream = require("stream");
const { promisify } = require("util");
const translit = require("../services/translit");
const fileType = require("file-type");
const got = require("got");
const axios = require("axios");
const pipeline = promisify(stream.pipeline);
const { location } = require("../config");

module.exports = (app) => {
  app.post("/api/categories/list", async ({ body }, res) => {
    await connectDB(true);
    categories.find(
      body.parent ? { parent: body.parent } : {},
      function (dbErr, dbRes) {
        connectDB(false);
        res.send(dbRes);
      }
    );
  });
  app.post("/api/categoriesList", async ({ body }, res) => {
    const { parent, page, perPage, sort, order } = body;
    const skip = perPage * page;
    const limit = skip + perPage;
    await connectDB(true);
    categories.find(
      { parent: parent || "0" },
      "_id name link image",
      { sort: { [sort]: order }, skip, limit },
      function (dbErr, dbRes) {
        connectDB(false);
        res.send(dbRes);
      }
    );
  });
  app.post("/api/categories/get", async ({ body }, res) => {
    await connectDB(true);
    categories.findOne({ _id: body._id }, function (dbErr, dbRes) {
      connectDB(false);
      res.send(dbRes);
    });
  });
  app.post("/api/categories/edit", async ({ body }, res) => {
    await connectDB(true);
    let newImage = "";
    try {
      if (body.image.indexOf("data:") >= 0 || body.image === "") {
      } else if (body.image.indexOf(":3001/images/") < 0) {
        const type = await fileType.fromStream(got.stream(body.image));
        const newSrc = `images/categories/${body._id}.${type.ext}`;
        await pipeline(got.stream(body.image), fs.createWriteStream(newSrc));
        newImage = location + newSrc;
      } else {
        newImage = body.image;
      }
    } catch {
      return res.send("error");
    }
    categories.findOneAndUpdate(
      { _id: body._id },
      { ...body, image: newImage },
      function (dbErr) {
        connectDB(false);
        res.send("ok");
      }
    );
  });
  app.post("/api/categories/remove", async ({ body }, res) => {
    await connectDB(true);
    categories.remove({ _id: body._id }, function (dbErr) {
      const removeFile = body.image.split("/").pop();
      if (
        fs.existsSync(`images/categories/${removeFile}`) &&
        body.image !== ""
      ) {
        fs.unlinkSync(`images/categories/${removeFile}`);
      }
      connectDB(false);
      res.send("ok");
    });
  });
  app.post("/api/categories/add", async ({ body }, res) => {
    await connectDB(true);
    categories.create({}, async (dbErr, dbRes) => {
      await axios
        .post(
          "http://localhost:3001/categories/edit",
          JSON.stringify({
            ...body,
            _id: dbRes._id,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          connectDB(false);
          res.send("ok");
        })
        .catch((error) => {
          res.send(error);
        });
    });
  });
};
