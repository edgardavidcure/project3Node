const { check, validationResult } = require('express-validator');

const contactValidation = [
  check('firstName', 'first name is required').not().isEmpty(),
  check('lastName', 'last name is required').not().isEmpty(),
  check('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check('favoriteColor', 'favorite color is required').not().isEmpty(),
  check('birthday', 'Please include a valid date of birth (yyyy-mm-dd)').isISO8601().toDate()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};
module.exports = { contactValidation, validate };
