const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async(req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                attributes: ['name'],
            }, ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async(req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['name'],
            }, ],
        });

        const blog = blogData.get({ plain: true });

        res.render('singleBlog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async(req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('dashboard', {
            blogs,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/new', withAuth, async(req, res) => {
    try {
        res.render('newBlog', {
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/edit/:id', withAuth, async(req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['name'],
            }, ],
        });

        const blog = blogData.get({ plain: true });

        res.render('editBlog', {
            ...blog,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
