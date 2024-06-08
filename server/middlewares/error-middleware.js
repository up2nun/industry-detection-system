const ApiError = require('../exceptions/api-error');

const errorHandler = (err, req, res, next) => {
    console.error('Произошла ошибка:', err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    } else {
        return res.status(500).json({ message: 'Непредвиденная ошибка' });
    }
};

module.exports = errorHandler;
