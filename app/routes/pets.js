var express = require('express');
var router = express.Router();
const Pet = require('../models/pet.js');
const withAuth = require('../middlewares/auth');

router.post('/', async function(req, res) {
  const { name, nameAnimal, animal_type, age, weight } = req.body;

  try {
    let pet = new Pet({ name: name, nameAnimal: nameAnimal, animal_type: animal_type, age: age, weight: weight, author: req.user_id });
    await pet.save();
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({error: 'Problema para cadastro'});
  }

  });

  module.exports = router;
