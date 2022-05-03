const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/keys').jwtSecret;

// @route  POST /login
// @desc   Test route
// @access Public
router.post(
  '/',
  [
    check('Email', 'Email required').not().isEmpty(),
    check('Password', 'Password required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const email = req.body.Email;
      const passwd = req.body.Password;
      console.log(email, passwd);
      //check user exists or not
      let users = await User.findOne({ Email: email });
      if (!users) {
        return res
          .status(400)
          .json({ error: [{ msg: 'No such user exists' }] });
      }
      //check password is correct or not

      let passwdCheck = await bcrypt.compare(req.body.Password, users.Password);
      if (!passwdCheck) {
        return res.status(400).json({ error: { msg: 'Wrong password' } });
      }
      const flag = false;
      const payload = {
        user: {
          doctor: flag,
          id: users.id,
          email: users.Email,
          password: users.Password,
          username: users.Username,
        },
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 36000 }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('(Server) User login  error');
    }
  }
);

module.exports = router;
