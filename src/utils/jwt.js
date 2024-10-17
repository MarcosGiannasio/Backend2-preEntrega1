import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'ClaveSecreta-firma';

const generateToken = user => jwt.sign(user, PRIVATE_KEY, { expiresIn: '1h' });

const authTokenMiddleware = (req, res, next) => {
    // lo que viene en headers
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send({ status: 'error', error: 'not authenticated' });
    
    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (error, dataToken) => {
        if (error || dataToken.role !== 'admin') {
            return res.status(403).send({ status: 'error', message: 'Ingreso no permitido' });
        }
        req.user = dataToken;
        next();
    });
};

export { generateToken, authTokenMiddleware };
