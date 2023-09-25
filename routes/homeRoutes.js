const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('homepage');
})

 router.get('/blog/:id', async(req, res) => {
   const blogData = await Blog.find({
        where:{
            id: req.params.id
        }
    })
    console.log(req.params.id);
     res.render('singleBlog',{
        blogData
     });
 })

module.exports = router;
