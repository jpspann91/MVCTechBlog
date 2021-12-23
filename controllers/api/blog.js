const router = require('express').Router();
const { Blog } = require('../../models');

router.post('/createblog', async (req,res)=> { 
  try { 

    console.log(req.session.user_id)
    console.log(req.body)
      
    let newBlogPost = { 
      ...req.body, 
      blogger_id: req.session.user_id
    }

    console.log(newBlogPost)
    let newBlogObj = await Blog.create(newBlogPost)
      res.json({ newBlogObj, message: 'Blog Created!' });

} catch (err) {
  res.status(400).json(err);
}
})

module.exports = router