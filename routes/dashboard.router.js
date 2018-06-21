const express = require('express');
const router = new express.Router();

router.get('/', (req, res, next) => {
  if ( req.user ) {
    next('route');
  }
  next()
});

router.get('/', (req, res, next) => {
  res.send('one')
});

router.get('/', (req, res, next) => {
  res.send('two');
})

module.exports = router;
