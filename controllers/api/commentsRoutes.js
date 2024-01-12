const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comments.create({
            text: req.body.text,
            blogpost_id: req.body.blogpost_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
