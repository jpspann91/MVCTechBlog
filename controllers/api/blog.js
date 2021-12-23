//Import router and Blog Model
const router = require('express').Router();
const { Blog } = require('../../models');

//Route to create a blog post
router.post('/createblog', async (req,res)=> { 
  try { 
    //Used for testing
    console.log(req.session.user_id)
    console.log(req.body)
    //New blog post object with body as information 
    let newBlogPost = { 
      ...req.body, 
      blogger_id: req.session.user_id
    }

    console.log(newBlogPost)
    //Create a new blog with Sequelize model 
    let newBlogObj = await Blog.create(newBlogPost)
      res.json({ newBlogObj, message: 'Blog Created!' });
//Catch error
} catch (err) {
  res.status(400).json(err);
}
})

module.exports = router