//Import router and User model
const router = require('express').Router();
const { User } = require('../../models');

//Post request to create a user
router.post('/createuser', async (req,res)=> { 
  try { 

    //Variable to hold new userData
    const newUserData = await User.create(req.body)

    //Req.sessions for cookies
    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.logged_in = true;
      
      res.json({ user: newUserData, message: 'Welcome!' });
    });

    //Catch error
} catch (err) {
  res.status(400).json(err);
}
})

//Post request to login
router.post('/login', async (req, res) => {
  try {
    //User data object find a User model that matches the email passed in by the user
    const userDataObj = await User.findOne({ where: { email: req.body.email } });

    //If it doesnt exist give an error
    if (!userDataObj) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      //Return if not valid
      return;
    }

    //Variable to hold password passed in by user
    const validPassword = await userDataObj.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      //Return if not valid
      return;
    }
    //If email and password are good then start a session and set logged_in to true
    req.session.save(() => {
      req.session.user_id = userDataObj.id;
      req.session.logged_in = true;
      
      res.json({ user: userDataObj, message: 'You are now logged in!' });
    });
    //catch error
  } catch (err) {
    res.status(400).json(err);
  }
});
//Post request to log out the user
router.post('/logout', (req, res) => {
  //If currently logged in
  if (req.session.logged_in) {
    //then destroy the session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
