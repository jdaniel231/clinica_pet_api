require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const WithAuth = ( req, res, next ) => {
  const token = req.headers['x-access-token'];

  if(!token) {
    res.status(401).json({error: 'Não autorizado: nenhum token fornecido'});
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send('Não autorizado: token inválido');
      } else {
        req.crmv = decoded.crmv;
        User
          .findOne({crmv: decoded.crmv })
          .then(user => {
            req.user = user
            next();
          }).catch(err => {
            res.status(401).send(err);
          })
      
      }
    });
  }
}

module.exports = WithAuth;