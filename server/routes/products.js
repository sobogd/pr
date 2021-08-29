const products = require("../models/products");
const fs = require("fs");
const stream = require("stream");
const { promisify } = require("util");
const translit = require("../services/translit");
const fileType = require("file-type");
const got = require("got");
const axios = require("axios");
const pipeline = promisify(stream.pipeline);
const { location } = require("../config");
const connectDB = require("../services/db");
const fileDownload = require("../services/fileDownloadAndGetLink");
const fileRemove = require("../services/fileRemove");

/**
 * Загружаем изображения, если есть, и добавляем остальные данные в БД.
 * @param body Тело объекта, который нужно записать.
 */
const edit = async (body) => {
  // проходим по ссылкам на изображения, и загружаем новые
  let images = [];
  for (let i = 0; i < body.images.length; i++) {
    const downloadImage = await fileDownload(
      body.images[i].src,
      i,
      translit(body.name),
      `products/${body._id}`
    );
    images.push({
      sort: body.images[i].sort,
      src: downloadImage,
    });
  }
  // проходим по файлам в папке и удаляем те, которые не нужны
  const imagesPath = `images/products/${body._id}/`;
  if (require("fs").existsSync(imagesPath)) {
    const productFiles = fs.readdirSync(imagesPath);
    for (let file in productFiles) {
      let remove = true;
      for (let image in images) {
        if (images[image].src.indexOf(productFiles[file]) >= 0) {
          remove = false;
          break;
        }
      }
      if (remove) fs.unlinkSync(`${imagesPath}${productFiles[file]}`);
    }
  }
  // сохраняем изменения в БД
  const updateResult = await products.findOneAndUpdate(
    { _id: body._id },
    { ...body, images }
  );
  return updateResult;
};

/**
 * Методы для работы со товарами.
 * @param app Приложение Express.
 */
module.exports = (app) => {
  /**
   * Получить список всех товаров.
   */
  app.post("/api/products/list", async ({ body }, res) => {
    await connectDB(true);
    try {
      const { category, page, perPage, sort } = body;
      const skip = perPage * page;
      const limit = skip + perPage;
      const allProducts = await products.find({});
      console.log("find", allProducts);
      return res.send(allProducts);
    } catch (error) {
      console.log("error", error);
      return res.send(error);
    } finally {
      await connectDB(false);
    }
  });
  /**
   * Получить товар по ID.
   */
  // app.post('/products/get', async ({ body }, res) => {
  //     await connectDB(true);
  //     products.findOne({ _id: body._id }, function (dbErr, dbRes) {
  //         connectDB(false);
  //         res.send(dbRes);
  //     });
  // });
  /**
   * Удалить товар по ID вместе с файлами.
   */
  app.post("/api/products/remove", async ({ body }, res) => {
    await connectDB(true);
    try {
      const removeResult = await products.remove({ _id: body._id });
      await require("fs").rmdirSync(`images/products/${body._id}`, {
        recursive: true,
      });
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
   * Редактировать товар по ID.
   */
  app.post("/api/products/edit", async ({ body }, res) => {
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
   * Добавить товар и по ID обновить его данными.
   */
  app.post("/api/products/add", async ({ body }, res) => {
    await connectDB(true);
    try {
      const createResult = await products.create({});
      await require("fs").mkdirSync(`images/products/${createResult._id}`);
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
  app.post("/api/products/ali", async ({ body }, res) => {
    const productId = body.linkAli.split(".html")[0].split("/").pop();
    const url = `https://m.aliexpress.com/fn/fc-detail-msite/index?productId=${productId}&pageName=detail-msite`;
    try {
      await axios
        .get(url, {
          headers: {
            Accept: "*/*",
            Pragma: "no-cache",
            Cookie:
              "aep_usuc_f=site=glo&c_tp=USD&b_locale=en_US; xman_us_f=x_locale=en_US; intl_locale=en_US;",
            Referer: `https://m.aliexpress.com/item/${productId}.html`,
            "Cache-Control": "no-cache",
            Host: "m.aliexpress.com",
            "User-Agent":
              "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
            "Accept-Language": "ru",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
        })
        .then(async ({ data }) => {
          const product = data.data.data;
          let price,
            name,
            description,
            available,
            props = [],
            images = [],
            seoTitle,
            seoDescription,
            seoKeywords;
          for (let i in product) {
            if (i.indexOf("price_") >= 0) price = product[i].fields.maxPrice;
            if (i.indexOf("title_") >= 0) name = product[i].fields.title;
            if (i.indexOf("sku_") >= 0) {
              available = product[i].fields.skuInfo.skuList[0].skuStock;
              const imagesAli = product[i].fields.imageList;
              if (imagesAli && imagesAli.length > 0) {
                imagesAli.forEach((src) => {
                  images.push({
                    sort: 100,
                    src,
                  });
                });
              }
            }
            if (i.indexOf("meta_") >= 0) {
              seoTitle = product[i].fields.seoData.title;
              seoDescription = product[i].fields.seoData.description;
              seoKeywords = product[i].fields.seoData.keywords;
              const propsAli = product[i].fields.specificationInfo.propertyList;
              if (propsAli && propsAli.length > 0) {
                propsAli.forEach((prop) => {
                  props.push({
                    sort: 100,
                    name: prop.attrName,
                    value: prop.attrValue,
                  });
                });
              }
            }
            if (i.indexOf("overview_") >= 0)
              await axios
                .get(product[i].fields.url)
                .then(({ data }) => (description = data));
          }
          return res.send(
            JSON.stringify({
              name,
              price,
              description,
              available,
              props,
              images,
              seoTitle,
              seoDescription,
              seoKeywords,
            })
          );
        });
    } catch (error) {
      return res.send(error);
    }
  });
};
