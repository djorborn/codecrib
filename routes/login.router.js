const express = require('express');
const router = new express.Router();
const passport = require('../modules/passport');

router.get('/', (req, res, next) => {
  if ( req.user ) {
    next();
  } else {
    next('route')
  }
}, (req, res, next) => {
  // res.redirect('/');
  next();
});

router.get('/', (req, res, next) => {
  res.render('login');
});

router.get('/auth', passport.authenticate('github'))

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

module.exports = router;
