const checkDeveloperCode = (req, res, next) => {
    const code = req.headers['x-developer-code'];
    if (!code || code !== process.env.DEV_SECURITY_CODE) {
        return res.status(401).json({ message: 'Unauthorized developer access.' });
    }
    next();
};

module.exports = checkDeveloperCode;
  