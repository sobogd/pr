const connectDB = require('../services/db');
const products = require('../models/products');
const fs = require('fs');
const stream = require('stream');
const { promisify } = require('util');
const translit = require('../services/translit');
const fileType = require('file-type');
const got = require('got');
const axios = require('axios');
const pipeline = promisify(stream.pipeline);
const { location } = require('../config');

module.exports = (app) => {
    app.post('/products/list', async ({ body }, res) => {
        await connectDB(true);
        products.find(body.parent ? { parent: body.parent } : {}, function (dbErr, dbRes) {
            connectDB(false);
            res.send(dbRes);
        });
    });
    app.post('/products/get', async ({ body }, res) => {
        await connectDB(true);
        products.findOne({ _id: body._id }, function (dbErr, dbRes) {
            connectDB(false);
            res.send(dbRes);
        });
    });
    app.post('/products/edit', async ({ body }, res) => {
        await connectDB(true);
        // работа с изображениями
        const imagesPath = `images/products/${body._id}/`,
            newImages = [];
        for (let i = 0; i < body.images.length; i++) {
            if (body.images[i].src.indexOf('data:') >= 0) {
            } else if (body.images[i].src.indexOf(':3001/images/') < 0) {
                try {
                    const type = await fileType.fromStream(got.stream(body.images[i].src));
                    const newSrc = `${imagesPath}${translit(body.name)}-${new Date().getTime()}.${type.ext}`;
                    await pipeline(got.stream(body.images[i].src), fs.createWriteStream(newSrc));
                    newImages.push({
                        sort: body.images[i].sort,
                        src: location + newSrc,
                    });
                } catch (error) {
                    return res.send(error);
                }
            } else {
                newImages.push({
                    sort: body.images[i].sort,
                    src: body.images[i].src,
                });
            }
        }
        // проходим по файлам в папке и удаляем те, которые не нужны
        var productFiles = fs.readdirSync(imagesPath);
        for (let file in productFiles) {
            let remove = true;
            for (let image in newImages) {
                if (newImages[image].src.indexOf(productFiles[file]) >= 0) {
                    remove = false;
                    break;
                }
            }
            if (remove) fs.unlinkSync(`${imagesPath}${productFiles[file]}`);
        }
        // сохраняем изменения в БД
        products.findOneAndUpdate(
            { _id: body._id },
            {
                ...body,
                images: newImages,
            },
            () => {
                connectDB(false);
                res.send('ok');
            },
        );
    });
    app.post('/products/remove', async ({ body }, res) => {
        await connectDB(true);
        products.remove({ _id: body._id }, function (dbErr) {
            fs.rmdirSync(`images/products/${body._id}`, { recursive: true });
            connectDB(false);
            res.send('ok');
        });
    });
    app.post('/products/add', async ({ body }, res) => {
        await connectDB(true);
        products.create({}, async (_, dbRes) => {
            fs.mkdirSync(`images/products/${dbRes._id}`);
            await axios
                .post(
                    'http://localhost:3001/products/edit',
                    JSON.stringify({
                        ...body,
                        _id: dbRes._id,
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then(() => {
                    connectDB(false);
                    res.send('ok');
                })
                .catch((error) => {
                    res.send(error);
                });
        });
    });
};
