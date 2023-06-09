const router = require('express').Router();
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

//get user
router.get('/current', restoreUser, (req, res) => {
    const { user } = req;

    return user ? res.json({
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        }
    }) : res.json({ user: null });
});

//log in
router.post('/current', async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });

    if (!user || !bcrypt.compareSync(password, user.password.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    };

    const token = await setTokenCookie(res, safeUser);
    safeUser.token = token;

    return res.json({
        user: safeUser
    });
});

//log out
router.delete('/current', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
})

//sign up
router.post('/', async (req, res) => {
    let { email, password, username, firstName, lastName } = req.body;
    password = bcrypt.hashSync(password);
    const user = await User.create({ email, username, password, firstName, lastName });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

module.exports = router;