const router = require('express').Router();
const usersRouter = require('./users');

router.post('/test', (req, res) => {
  res.json({requestBody: req.body});
})

router.use('/users', usersRouter);

module.exports = router;
