const authMiddleware = {
    isAdmin: (req, res, next) => {
        const role = req.headers['x-user-role'];
        if (role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: Admin access required' });
        }
    },

    isUser: (req, res, next) => {
        const role = req.headers['x-user-role'];
        const userId = req.headers['x-user-id'];

        if (role === 'user' && userId) {
            req.userId = userId; // Simpan userId di request object
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: User access required' });
        }
    }
};

module.exports = authMiddleware;
