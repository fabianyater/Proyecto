const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../lib/auth');

const { renderIndex } = require('../controllers/index.controller');


router.get('/', isNotLoggedIn, renderIndex);

module.exports = router;