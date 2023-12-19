import { TokenService } from '../tokens/tokenService.js';
import { createApiError } from '../utils/error.js';

export const authMiddlewareAccessToken = async (req, res, next) => {
    try {
        const headerAuthorization = req.headers.authorization;

        if (!headerAuthorization) {
            return next(createApiError({ type: 'unauthorized' }));
        }

        const accessToken = headerAuthorization.split(' ')[1];

        if (!accessToken) {
            return next(createApiError({ type: 'unauthorized' }));
        }

        const userData = TokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(createApiError({ type: 'unauthorized' }));
        }

        req.user = userData;

        next();
    } catch (err) {
        return next(createApiError({ type: 'unauthorized' }));
    }
};
