const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    try{
        const token = req.headers["acc"];
        console.log(token);
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verified);
        if(!verified) {
            res.status(401).send({
                status: 401,
                message: 'User not Authenticated Please Login!',
                data: err
            })
        }

        next();

    } catch(err) {
        res.status(401).send({
            status: 401,
            message: 'User not Authenticated Please Login!!@',
            data: err
        })
    }
}

module.exports = { isAuth };