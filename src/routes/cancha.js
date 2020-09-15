const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderAddCancha, addCancha, renderCancha, rendercanchas } = require('../controllers/cancha.controllers');

router.get('/addCancha', renderAddCancha);

router.post('/addCancha', addCancha);

router.get('/listCancha', isLoggedIn, renderCancha);

module.exports = router;