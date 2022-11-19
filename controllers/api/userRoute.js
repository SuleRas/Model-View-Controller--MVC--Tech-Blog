const { User } = require("../../models")

const router = require("express").Router()


router.post("/login", async(req , res) => {
try {
 const userData = await User.findOne({
  email: req.body.email    
 })   
 if (!userData) {
    res
      .status(400)
      .json({ message: 'Incorrect email  please try again' });
    return;
  }
  const validPassword = await userData.checkPassword(req.body.password);

  if (!validPassword) {
    res
      .status(400)
      .json({ message: 'Incorrect password, please try again' });
    return;
  }
  req.session.save(() => {
    req.session.userId = userData.id;
    req.session.username = userData.name;
    req.session.logged_in = true;
    
    res.json({ user: userData, message: 'You are now logged in!' });
  });
} catch (error) {
res.status(400).json({
    msg: "Route failed"
})
    
}
} )

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
        
    }
    else {
        res.status(404).end()
    }
})












module.exports = router