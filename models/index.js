const BlogPosts = require('./blogPosts');
const Users = require('./Users');
const Comments = require('./Comments');

// Define associations between models
Users.hasMany(BlogPosts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

BlogPosts.belongsTo(Users, {
    foreignKey: 'user_id',
});

Users.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(Users, {
    foreignKey: 'user_id',
});

BlogPosts.hasMany(Comments, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(BlogPosts, {
    foreignKey: 'blogpost_id',
});

module.exports = { BlogPosts, Users, Comments };
