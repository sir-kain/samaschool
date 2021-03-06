'use strict';

var express = require('express');
var controller = require('./suivi_cours.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/cours/:cr', controller.getUserByCours);
router.get('/user/:us', controller.getCoursByUser);
// voir si un user suit un cours
router.get('/userCours/:user/:cours', controller.getUserAndCours);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
