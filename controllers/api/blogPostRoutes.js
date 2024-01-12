const router = require('express').Router();
const { BlogPosts } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new blog post
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await BlogPosts.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to update a blog post
router.put('/:id', withAuth, async (req, res) => {
    try {
        await BlogPosts.update({
            title: req.body.title,
            text: req.body.text,
            created_on: req.body.created_on,
            user_id: req.session.user_id,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        res.status(200).json({ message: 'Blog post updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to delete a blog post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        await BlogPosts.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
