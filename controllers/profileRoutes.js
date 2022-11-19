const router = require('express').Router();
const {User, Post, Comment} = require("../models") 
const withAuth = require("../utils/auth.js")
router.get("/" ,withAuth, async(req, res) => {
    try {
        // Get all post and JOIN with user data
        const postData = await Post.findAll({
         where: {
             userId: req.session.userId
         }
        });
    
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
    
        // Pass serialized data and session flag into template
         res.render('profile', { 
           posts, 
          logged_in: req.session.logged_in,
         }); 
       
      } catch (err) {
        res.status(500).json(err);
        
      }
})


module.exports = router;