const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const { renderCentros, addCentro, renderMiCentro, renderAddCentro } = require('../controllers/centro.controller');

router.get('/centro', isLoggedIn, renderMiCentro);

router.get('/addCentro', isLoggedIn, renderAddCentro);

router.post('/addCentro', addCentro);

router.get('/listCentro', isLoggedIn, renderCentros);

module.exports = router