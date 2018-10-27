'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _views = require('../views');

var router = new _express.Router();

router.route("/all").get(_views.students.all);
router.route("/create").post(_views.students.create);
router.route("/delete/:id").delete(_views.students.delete);
router.route("/update/:id").put(_views.students.update);
router.route("/:id").get(_views.students.get);

exports.default = router;