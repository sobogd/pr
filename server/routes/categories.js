const connectDB = require("../services/db");
const categories = require("../models/categories");
const fileDownload = require("../services/fileDownloadAndGetLink");

/**
 * Загружаем изображения, если есть, и добавляем остальные данные в БД.
 * @param body Тело объекта, который нужно записать.
 */
const edit = async (body) => {
  const image = await fileDownload(body.image, "1", body._id, "categories");
  const updateResult = await categories.findOneAndUpdate(
    { _id: body._id },
    { ...body, image }
  );
  return updateResult;
};

/**
 * Методы для работы со категориями.
 * @param app Приложение Express.
 */
module.exports = (app) => {
  /**
   * Получить список всех категорий.
   */
  app.post("/api/categories/list", async ({ body }, res) => {
    await connectDB(true);
    try {
      const { parent, page, perPage, sort } = body;
      const skip = perPage * page;
      const limit = skip + perPage;
      const allCategries = await categories.find(
        body.parent ? { parent: body.parent } : {}
      );
      console.log("find", allCategries);
      return res.send(allCategries);
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    } finally {
      await connectDB(false);
    }
  });
  // app.post("/api/categoriesList", async ({ body }, res) => {
  //   const { parent, page, perPage, sort, order } = body;
  //   const skip = perPage * page;
  //   const limit = skip + perPage;
  //   await connectDB(true);
  //   categories.find(
  //     { parent: parent || "0" },
  //     "_id name link image",
  //     { sort: { [sort]: order }, skip, limit },
  //     function (dbErr, dbRes) {
  //       connectDB(false);
  //       res.send(dbRes);
  //     }
  //   );
  // });
  // app.post("/api/categories/get", async ({ body }, res) => {
  //   await connectDB(true);
  //   categories.findOne({ _id: body._id }, function (dbErr, dbRes) {
  //     connectDB(false);
  //     res.send(dbRes);
  //   });
  // });
  /**
   * Редактировать категорию по ID.
   */
  app.post("/api/categories/edit", async ({ body }, res) => {
    await connectDB(true);
    try {
      const editResult = await edit(body);
      console.log("findOneAndUpdate", editResult);
      return res.send("ok");
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    } finally {
      await connectDB(false);
    }
  });
  /**
   * Удалить категорию по ID вместе с файлами.
   */
  app.post("/api/categories/remove", async ({ body }, res) => {
    await connectDB(true);
    try {
      const removeResult = await categories.remove({ _id: body._id });
      await fileRemove(body.image);
      console.log("remove", removeResult);
      return res.send("ok");
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    } finally {
      await connectDB(false);
    }
  });
  /**
   * Добавить категорию и обновить ее данными по добавленному ID.
   */
  app.post("/api/categories/add", async ({ body }, res) => {
    await connectDB(true);
    try {
      const createResult = await categories.create({});
      const resultEdit = await edit({ ...body, _id: createResult._id });
      console.log(resultEdit);
      return res.send("ok");
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    } finally {
      await connectDB(false);
    }
  });
};
