const router = require('express').Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

//get user
router.get('/current', (req, res) => {

});

//log in
router.post('/current', (req, res) => {

});

//sign up
router.post('/users', (req, res) => {

});

module.exports = router;