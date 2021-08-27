const slides = require('../models/slides');
const fileDownload = require('../services/fileDownloadAndGetLink');
const fileRemove = require('../services/fileRemove');
const connectDB = require('../services/db');

/**
 * Загружаем 2 изображения, если есть, и добавляем остальные данные в БД.
 * @param body Тело объекта, который нужно записать.
 */
const edit = async (body) => {
    const image1 = await fileDownload(body.image1, '1', body._id, 'slides');
    const image2 = await fileDownload(body.image2, '2', body._id, 'slides');
    const updateResult = await slides.findOneAndUpdate({ _id: body._id }, { ...body, image1, image2 });
    return updateResult;
};

/**
 * Методы для работы со слайдами.
 * @param app Приложение Express.
 */
module.exports = (app) => {
    /**
     * Получить список всех слайдов.
     */
    app.post('/slides/list', async ({ body }, res) => {
        await connectDB(true);
        try {
            const allSlides = await slides.find();
            console.log('find', allSlides);
            res.send(allSlides);
        } catch (error) {
            console.log('error', error);
            res.send(error);
        } finally {
            await connectDB(false);
        }
    });
    /**
     * Редактировать слайд по ID.
     */
    app.post('/slides/edit', async ({ body }, res) => {
        await connectDB(true);
        try {
            const editResult = await edit(body);
            console.log('findOneAndUpdate', editResult);
            return res.send('ok');
        } catch (error) {
            console.log('error', error);
            return res.send(error);
        } finally {
            await connectDB(false);
        }
    });
    /**
     * Удалить слайд по ID вместе с файлами.
     */
    app.post('/slides/remove', async ({ body }, res) => {
        await connectDB(true);
        try {
            const removeResult = await slides.remove({ _id: body._id });
            await fileRemove(body.image1);
            await fileRemove(body.image2);
            console.log('remove', removeResult);
            return res.send('ok');
        } catch (error) {
            console.log('error', error);
            return res.send(error);
        } finally {
            await connectDB(false);
        }
    });
    /**
     * Добавить слайд и обновить его данными по добавленному ID.
     */
    app.post('/slides/add', async ({ body }, res) => {
        await connectDB(true);
        try {
            const createResult = await slides.create({});
            const resultEdit = await edit({ ...body, _id: createResult._id });
            console.log(resultEdit);
            return res.send('ok');
        } catch (error) {
            console.log('error', error);
            return res.send(error);
        } finally {
            await connectDB(false);
        }
    });
};
