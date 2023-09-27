const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));
router.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.statusCode).json({
    message: err.message
  });
});
module.exports = router;
