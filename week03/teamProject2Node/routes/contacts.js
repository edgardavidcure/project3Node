const express = require('express');
const router = express.Router();

const { contactValidation, validate } = require('../validation');

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactValidation, validate, contactsController.createContact);

router.put('/:id', contactValidation, validate, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
