const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../lib/auth');

const { renderSignUp, signUp, renderSignIn, signIn, logout } = require('../controllers/auth.controllers');

router.get('/signup', isNotLoggedIn, renderSignUp);

router.post('/signup', signUp);

router.get('/signin', isNotLoggedIn, renderSignIn);

router.post('/signin', signIn);

router.get('/logout', logout);

module.exports = router;