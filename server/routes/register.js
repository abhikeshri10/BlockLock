const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/keys').jwtSecret;
const axios = require('axios');
// @route  POST /register
// @desc   Test route
// @access Public
router.post(
  '/',
  [
    check('Email', 'Please enter valid email').isEmail(),
    check('Password', 'Please enter a valid password').isLength({ min: 6 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const username = req.body.Username;
      const email = req.body.Email;
      const password = req.body.Password;
      // check whether this users already exist
      let users = await User.findOne({ Email: email });
      if (users) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] });
      }
      // Create new users object
      users = new User({
        Username: username,
        Email: email,
        Password: password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      users.Password = await bcrypt.hash(password, salt);

      await users.save();

      // Return web token
      const flag = false;
      const payload = {
        user: {
          id: users.id,
          email: users.Email,
          password: users.Password,
          username: users.Username,
        },
      };
      var data = {
        username: users.Username,
        secret: users.Password,
        email: users.Email,
      };
      console.log(data);

      var config = {
        method: 'post',
        url: 'https://api.chatengine.io/users/',
        headers: {
          'PRIVATE-KEY': process.env.CHAT_ENGINE_PRIVATE_KEY,
        },
        data: data,
      };
      console.log(config);
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      jwt.sign(payload, jwtSecret, { expiresIn: 36000 }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('(Server) User registration  error');
    }
  }
);
module.exports = router;
