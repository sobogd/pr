const { location } = require('../config');

/**
 * Функция по загрузке файлов из base64 строки и файлов по ссылке
 */
module.exports = async (image, number, name, folder) => {
    if (image.indexOf('data:') < 0 && image.indexOf('http') >= 0) {
        // если в поле указана ссылка для скачивания
        if (image.indexOf(location) < 0) {
            // если не найдена папка для товара - создаем ее
            if (!require('fs').existsSync(`images/${folder}`)) require('fs').mkdirSync(`images/${folder}`);
            // определяем метод: https или http
            const method = image.indexOf('https:') < 0 ? require('http') : require('https');
            // создаем шаблон имени файла
            const fileTemplate = `images/${folder}/${number}-${name}.${image.split('.').pop()}`;
            // создаем новый файл по шаблону имени
            const newFile = require('fs').createWriteStream(fileTemplate);
            // загружаем файл по сылке в созданный выше файл
            method.get(image, (response) => {
                response.pipe(newFile);
            });
            // возвращаем ссылку на загруженный файл
            return location + fileTemplate;
        } else {
            // если файл лежит на нашем сервере
            return image;
        }
    } else if (image.indexOf('data:') >= 0 && image.indexOf('base64') >= 0) {
        // если не найдена папка для товара - создаем ее
        if (!require('fs').existsSync(`images/${folder}`)) require('fs').mkdirSync(`images/${folder}`);
        // если в поле лежит base64 файл
        const imgBase64 = image.split(';base64,')[1];
        // определяем тип файла
        const type = image.match(/[^:/]\w+(?=;|,)/)[0];
        // создаем шаблон имени файла
        const fileTemplate = `images/${folder}/${number}-${name}.${type}`;
        // загружаем файл из base64 в шаблон
        require('fs').writeFileSync(fileTemplate, imgBase64, { encoding: 'base64' });
        // возвращаем ссылку на загруженный файл
        return location + fileTemplate;
    } else {
        return '';
    }
};
