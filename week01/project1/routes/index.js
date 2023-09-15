const router = require('express').Router();
const controller = require('../controllers/users');


router.use('/users', require('./users'));

// const getData = function(ap) {
//     const contacts = require('../controllers/index.js');
  
//     // contacts Routes
//     app.route('/get')
//       .get(contacts.get_one);

//     app.route('/getAll')
//       .get(contacts.get_all)
// }
  
module.exports = router
