//Import router, User and Blog models and withAuth helper function
const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

//Get request to get Blogs 
router.get('/', async (req, res) => {
  try {
    //Set variable for logged_in from session
    let logged_in = req.session.logged_in

    //Variable to hold blog data found from sequalize method findAll
    let blogData = await Blog.findAll({
      //Inlude the user models as well as user
      include:[
        {model: User, as :"user"}
      ]
    })

    //Scrub the data returned mapped into an array
    let serializedData = blogData.map(blog=> blog.get({plain:true}))

   //Render the blog.handlebars page give serialzed data and logged_in variable
   res.render("blog", {data:serializedData, logged_in})
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get route to redirect when logged in
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    //If logged in then redirect to the homepage
    res.redirect('/');
    return;
  }
  //If not logged in then render the login page
  res.render('login');
});

//Get route to create an account
router.get('/newuser', (req,res)=>{
  console.log("kjshdkjshd")
  //Render the create account handlebars page
  res.render('newAccount')
})

//Get route to send to dashboard
router.get('/dashboard', withAuth, (req, res)=>{ 
  res.render("dashboard")
})

module.exports = router;
