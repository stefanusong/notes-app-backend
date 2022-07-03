const successResponse = (msg, data) => ({
    status: 'success',
    message: msg,
    data,
});

const errResponse = (msg) => ({
    status: 'fail',
    message: msg,
});

module.exports = { successResponse, errResponse };
