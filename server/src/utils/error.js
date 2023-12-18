export const createApiError = ({ message = '', statusCode, type }) => {
    if (type === 'unauthorized') {
        const error = new Error('User doesn`t authorize');
        error.statusCode = 401;
        return error;
    } else if (type === 'badRequest') {
        const error = new Error(message);
        error.statusCode = 400;
        return error;
    } else {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }
};
