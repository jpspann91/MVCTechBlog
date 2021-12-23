//Import everything needed for server.js file
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Use express and set PORT
const app = express();
const PORT = process.env.PORT || 3001;

//USer handlebars
const hbs = exphbs.create({ helpers });

//Create session
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//Middle ware to use Session
app.use(session(sess));

//Set app engine to handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middleware for express things
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Use the routes passed in
app.use(routes);

//Sync sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening' + PORT));
});
