//Import sequelize and User model
const sequelize = require('../config/connection');
const { User } = require('../models');

//Import User Data Json file to seed database
const userData = require('./userData.json');

//Seed dataBase function
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //Bulk create method from sequelize
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
