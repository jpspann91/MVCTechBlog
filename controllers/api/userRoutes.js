const router = require('express').Router();
const { User } = require('../../models');

router.post('/createuser', async (req,res)=> { 
  try { 

    const newUserData = await User.create(req.body)

    req.session.save(() => {
      req.session.user_id = newUserData.id;
      req.session.logged_in = true;
      
      res.json({ user: newUserData, message: 'Welcome!' });
    });

} catch (err) {
  res.status(400).json(err);
}
})
router.post('/login', async (req, res) => {
  try {
    const userDataObj = await User.findOne({ where: { email: req.body.email } });

    if (!userDataObj) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userDataObj.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userDataObj.id;
      req.session.logged_in = true;
      
      res.json({ user: userDataObj, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
