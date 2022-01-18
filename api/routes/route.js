const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/auth')
const contactCtrl = require('../controllers/contact')

const jwtMiddleware = require('../middleware/authJwt');
const yupMiddleware = require('../middleware/yupValidation');
const operationMiddleware = require('../middleware/operation');

const signupSchema = require('../validations/signup')
const addOrEditContactSchema = require('../validations/addOrEditContact')

router.post('/login', loginCtrl.login);
router.post('/signup', yupMiddleware.validation(signupSchema), loginCtrl.signup);

router.get('/contacts/:_id', jwtMiddleware.verifyToken, operationMiddleware.isAuthorizedToEditOrDeleteContact(), contactCtrl.getContact);
router.get('/contacts', jwtMiddleware.verifyToken, contactCtrl.getAllContacts);
router.put('/contacts/:_id', jwtMiddleware.verifyToken, yupMiddleware.validation(addOrEditContactSchema), operationMiddleware.isAuthorizedToEditOrDeleteContact(), contactCtrl.editContact);
router.post('/contacts', jwtMiddleware.verifyToken, yupMiddleware.validation(addOrEditContactSchema), contactCtrl.addContact);
router.delete('/contacts/:_id', jwtMiddleware.verifyToken, operationMiddleware.isAuthorizedToEditOrDeleteContact(), contactCtrl.deleteContact);

module.exports = router