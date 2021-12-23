//import router
const router = require('express').Router();

//import api routes
const apiRoutes = require('./api');
//import homeroutes
const homeRoutes = require('./homeRoutes');

//Set middle ware to use homeRoutes and api routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
