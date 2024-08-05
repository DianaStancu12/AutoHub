const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
jwksUri: 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
});

function getKey(header, callback) {
client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
});
}

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.log('Authorization header missing');
        return res.status(401).send({ error: 'Please authenticate.' });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token received in backend:', token);

    if (!token) {
        return res.status(401).send({ error: 'Please authenticate.' });
    }
    
    try {
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, async (err, decoded) => {
            if (err) {
                console.log('Authentication error:', err);
                return res.status(401).send({ error: 'Please authenticate.' });
            }
            console.log('Decoded token:', decoded);

            req.user = {
        uid: decoded.user_id,
        email: decoded.email,
        role: decoded.role || 'client' 
        };

        next();
        });
    } catch (e) {
        console.log('Authentication error:', e);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = authMiddleware;
