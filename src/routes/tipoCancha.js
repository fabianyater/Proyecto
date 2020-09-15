const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderEditTipoCancha, addTipoCancha, deleteTipoCancha, editTipoCancha, renderAddTipoCancha, renderTipoCancha } = require('../controllers/tipoCancha.controllers');

router.get('/addTipoCancha', isLoggedIn, renderAddTipoCancha);

router.post('/addTipoCancha', addTipoCancha);

router.get('/editTipoCancha/:id', isLoggedIn, renderEditTipoCancha);

router.post('/editTipoCancha/:id', editTipoCancha);

router.get('/listTipoCancha', isLoggedIn, renderTipoCancha);

router.get('/deleteTipoCancha/:id', deleteTipoCancha);

module.exports = router;