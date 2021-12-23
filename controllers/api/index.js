//Import routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blog')

//Set middleware for userRoutes and blogRoutes
router.use('/users', userRoutes);
router.use('/blog', blogRoutes)

module.exports = router;
