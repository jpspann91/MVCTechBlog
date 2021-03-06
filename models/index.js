//import User, Blog and Comment models
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comments')

//Set relatinoships between models
Blog.belongsTo(User, { 
  foreignKey: 'blogger_id'
})

User.hasMany(Blog, { 
  foreignKey: 'blogger_id',
  onDelete: 'CASCADE',
})

Blog.hasMany(Comment, { 
  foreignKey: 'blog_id', 
  onDelete: "CASCADE"
})

Comment.belongsTo(Blog, { 
  foreignKey: 'blog_id'
})

module.exports = { User, Blog, Comment};
