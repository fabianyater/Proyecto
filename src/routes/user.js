const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderUserProfile, renderEditUser, editUser, renderInicio, deleteUser } = require('../controllers/user.controller');

router.get('/inicio', isLoggedIn, renderInicio);

router.get('/profile', isLoggedIn, renderUserProfile);

router.get('/edit/:id', isLoggedIn, renderEditUser);

router.post('/edit/:id', editUser);

router.get('/delete/:id', deleteUser);

module.exports = router;