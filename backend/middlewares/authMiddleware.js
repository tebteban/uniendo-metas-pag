// Middleware to check if user is logged in
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/admin/login');
};

// Middleware to check if user is admin (role='admin')
const adminOnlyMiddleware = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    // Si no es admin, redirigir al dashboard con mensaje de error
    res.redirect('/admin/dashboard?error=unauthorized');
};

module.exports = { authMiddleware, adminOnlyMiddleware };