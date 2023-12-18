export const errorMiddleware = async (err, req, res, next) => {
    console.log(err);

    if (!!err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Something went wrong' });
};
