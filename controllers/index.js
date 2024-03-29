const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// Use homeRoutes for default routes and apiRoutes for API routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
