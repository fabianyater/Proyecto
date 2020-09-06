const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderAddDeporte, addDeporte, editDeporte, renderEditDeporte, renderDeportes, deleteDeporte } = require('../controllers/deportes.controller');

router.get('/addDeporte', isLoggedIn, renderAddDeporte);

router.post('/addDeporte', addDeporte);

router.get('/editDeporte/:id', isLoggedIn, renderEditDeporte);

router.post('/editDeporte/:id', editDeporte);

router.get('/listDeporte', isLoggedIn, renderDeportes);

router.get('/deleteDeporte/:id', deleteDeporte);

module.exports = router;