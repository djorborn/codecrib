const express = require('express');
const router = new express.Router();

router.get('/', (req, res, next) => {
  console.log(req.user)
  res.render('code-crib', {
    user: (function() {
       if (!req.user) {
         return false;
       }
      return {
        username: req.user.username,
        name: req.user.name,
        imageUrl: req.user.imageUrl,
      };
    })(),
  });
});

module.exports = router;
