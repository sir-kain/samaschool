'use strict';

var express = require('express');
var controller = require('./annee_academique.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/user/:us', controller.getClassByUser);
router.get('/classe/:cl/:an', controller.getUserByclasse);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
