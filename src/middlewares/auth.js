const adminAuth = (req, res, next) => {
    let authToken = 'xyz';
    let isAuthTrue = authToken === 'xyz';
    if(!isAuthTrue) {
        res.status(401).send('Not Authorized');
    } else {
        next();
    }
};

module.exports = {
    adminAuth
}