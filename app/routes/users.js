var express = require('express');
var router = express.Router();
const User = require('../models/user.js')

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

module.exports = router;
