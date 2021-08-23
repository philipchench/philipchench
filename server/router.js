const express = require('express');
const router = express.Router();


router.get('/:userId', (req, res) => {
  res.send(req.params.userId)
});

router.post('/:userId', (req, res) => {
});

router.get('/:userId/:itemId', (req, res) => {
  res.send(req.params.itemId)
});

router.post('/:userId/:itemId', (req, res) => {
});

router.delete('/:userId/:itemId', (req, res) => {
  res.send('hello')
});

// function validateGenre(genre) {
//   const schema = {
//     name: Joi.string().min(3).required()
//   };

//   return Joi.validate(genre, schema);
// }

module.exports = router;