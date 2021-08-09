const mongoose = require('mongoose');

module.exports = async (connect) => {
    if (connect) {
        await mongoose.connect('mongodb://localhost:27017/site', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        const db = mongoose.connection;
        await db.on('error', console.error.bind(console, 'Произошла ошибка при подключении к базе данных'));
        return mongoose;
    } else {
        return mongoose.connection.close();
    }
}