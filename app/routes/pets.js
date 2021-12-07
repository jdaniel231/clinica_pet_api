var express = require('express');
var router = express.Router();
const Pet = require('../models/pet.js');
const withAuth = require('../middlewares/auth');

router.post('/', withAuth, async function(req, res) {
  const { name, nameAnimal, animal_type, age, weight } = req.body;

  try {
    let pet = new Pet({ name: name, nameAnimal: nameAnimal, animal_type: animal_type, age: age, weight: weight, author: req.user._id });
    await pet.save();
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({error: 'Problema para cadastro'});
  }

});

router.get('/:id', withAuth, async(req, res) =>{
  try {
    const { id } = req.params;
    let pet = await Pet.findById(id);
    if(isOwner(req.user, pet))
      res.json(pet);
    else
    res.status(403).json({error: 'Permissão negado'});
  } catch (error) {
    res.status(500).json({error: 'Problema para obter pet'});
  }
})

router.put('/:id', withAuth, async(req, res) => {
  const {  name, nameAnimal, animal_type, age, weight } = req.body;
  const { id } = req.params;
  
  try {
    let pet = await Pet.findById(id);
    if(isOwner(req.user, pet)){
      pet = await Pet.findByIdAndUpdate(id,
        { $set: {name: name, nameAnimal: nameAnimal, animal_type: animal_type, age: age, weight: weight} },
        { upsert: true, 'new': true }  
      );
      res.json(pet)
    } else
      res.status(403).json({error: 'Permissão negado'});
  } catch (error) {
    res.status(500).json({error: 'Problema para atualizar a pet'});
  }
})

router.get('/', withAuth, async (req, res) => {
  try {
    let pets = await Pet.find({author: req.user._id })
    res.send(pets)
  } catch (error) {
    res.status(500).json({error: 'Problema para obter pet'});
  }
})

const isOwner = (user, pet) =>{
  if(JSON.stringify(user._id) == JSON.stringify(pet.author._id))
    return true;
  else
    return false;
}

module.exports = router;
