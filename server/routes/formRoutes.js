const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/form', formController.createForm);
router.get('/form/all', formController.getAllForms);
router.post('/get-data', formController.getDataByEmail);

module.exports = router;
