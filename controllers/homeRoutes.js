const router = require('express').Router();
const { Users, BlogPosts, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Route to get the homepage
router.get('/', async (req, res) => {
    try {
        // Get all blog posts with associated user data
        const blogPosts = await BlogPosts.findAll({
            include: [
                {
                    model: Users,
                    attributes: { exclude: ['password'] },
                },
            ],
        });

        // Serialize the data
        const posts = blogPosts.map((post) => post.get({ plain: true }));

        // Pass the data to the homepage along with the session flag
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get a single blog post
router.get('/getPost/:id', async (req, res) => {
    try {
        // Get a single blog post with associated user and comment data
        const blogPost = await BlogPosts.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    attributes: { exclude: ['password'] },
                },
                {
                    model: Comments,
                    include: [{ model: Users, attributes: { exclude: ['password'] } }],
                },
            ],
        });

        // Serialize the data
        const singlePost = blogPost.get({ plain: true });

        // Pass the data to the blogpost page along with the session login data
        res.render('blogpost', {
            singlePost,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/getPost/user/:id', async (req, res) => {
    try {
        // Get blogpost for the user
        const blogPost = await BlogPosts.findByPk(req.params.id, {
            include: [
                {
                    model: Users,
                    attributes: {exclude: ['password']},
                },
                {
                    model: Comments,
                    include: [{model: Users, attributes: {exclude: ['password']}},],
                },
            ],
        });
        const singlePost = blogPost.get({plain: true});

        res.render('blogpost-edit', {
            singlePost,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // get blogposts by user
        const userData = await Users.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPosts }],
        });

        const user = userData.get({ plain: true });

        // render the list of blogposts to the dashboard
        res.render('dashboard', { 
            user,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // if the user is already logged in, send them to the dashboard
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});


module.exports = router;


