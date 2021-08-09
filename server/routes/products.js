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
    app.post('/products/ali', async ({ body }, res) => {
        const productId = body.linkAli.split('.html')[0].split('/').pop();
        const url = `https://m.aliexpress.com/fn/fc-detail-msite/index?productId=${productId}&pageName=detail-msite`;
        try {
            await axios
                .get(url, {
                    headers: {
                        Accept: '*/*',
                        Pragma: 'no-cache',
                        Cookie: 'aep_usuc_f=site=glo&c_tp=USD&b_locale=en_US; xman_us_f=x_locale=en_US; intl_locale=en_US;',
                        Referer: `https://m.aliexpress.com/item/${productId}.html`,
                        'Cache-Control': 'no-cache',
                        Host: 'm.aliexpress.com',
                        'User-Agent':
                            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
                        'Accept-Language': 'ru',
                        'Accept-Encoding': 'gzip, deflate, br',
                        Connection: 'keep-alive',
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
                        if (i.indexOf('price_') >= 0) price = product[i].fields.maxPrice;
                        if (i.indexOf('title_') >= 0) name = product[i].fields.title;
                        if (i.indexOf('sku_') >= 0) {
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
                        if (i.indexOf('meta_') >= 0) {
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
                        if (i.indexOf('overview_') >= 0)
                            await axios.get(product[i].fields.url).then(({ data }) => (description = data));
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
                        }),
                    );
                });
        } catch (error) {
            return res.send(error);
        }
    });
};
