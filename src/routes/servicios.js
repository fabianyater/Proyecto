const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { addServicio, renderAddServicio, renderServicios, deleteServicio, renderEditServicio, editServicio } = require('../controllers/servicios.controller');

router.get('/addServices', isLoggedIn, renderAddServicio);

router.post('/addServices', addServicio);

router.get('/editServices/:id', isLoggedIn, renderEditServicio);

router.post('/editServices/:id', editServicio);

router.get('/listServices', isLoggedIn, renderServicios);

router.get('/deleteServices/:id', deleteServicio);

module.exports = router;