const verifyRolesMiddleware = (allowedRoles) => (req, res, next) => {
    const { __t } = req.session.user;
    const result = allowedRoles.includes(__t);

    if (result) {
        return next();
    }

    res.status(403).json({
        message: 'you do not have permission to access',
    });
};

export { verifyRolesMiddleware };
