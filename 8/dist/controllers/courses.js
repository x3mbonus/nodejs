'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _views = require('../views');

var router = new _express.Router();

router.route("/all").get(_views.courses.all);
router.route("/create").post(_views.courses.create);
router.route("/delete/:id").delete(_views.courses.remove);
router.route("/update/:id").put(_views.courses.update);
router.route("/:id").get(_views.courses.get);

exports.default = router;