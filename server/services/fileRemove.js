/**
 * Удаление файла или категории по пути
 * @param {*} link Ссылка на файл/категорию.
 */
module.exports = async (link) => {
    if (link && link !== '' && link !== 'false') {
        let removeFile = link.split('images/').pop();
        if (require('fs').existsSync(`images/${removeFile}`)) require('fs').unlinkSync(`images/${removeFile}`);
    } else {
        return '';
    }
};
