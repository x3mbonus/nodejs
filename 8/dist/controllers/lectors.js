'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _views = require('../views');

var router = new _express.Router();

router.route("/all").get(_views.lectors.all);
router.route("/create").post(_views.lectors.create);
router.route("/delete/:id").delete(_views.lectors.delete);
router.route("/update/:id").put(_views.lectors.update);
router.route("/:id").get(_views.lectors.get);

exports.default = router;