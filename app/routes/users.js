var express = require('express');
var router = express.Router();
const User = require('../models/user.js')

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN

router.post('/register', async (req, res) => {
  const {name, email, crmv, password} = req.body;
  const user = new User({name, email, crmv, password});

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: "Erro ao registrar novo usuário, tente novamente"});
  }
});

router.post('/', async (req, res) => {
  const {crmv, password} = req.body;

  try{
    let user = await User.findOne({crmv})
    if(!user) {
      res.status(401).json({error: 'Senha ou Crmv incorretos'})
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (!same) {
          res.status(401).json({error: 'Senha ou Crmv incorretos'})
        } else {
          const token = jwt.sign({crmv}, secret, { expiresIn: '10d' });
          res.json({user: user, token: token});
        }
      });
    }
  } catch {
    res.status(500).json({error: "Erro interno por favor tente novamente"});
  }
});

module.exports = router;
