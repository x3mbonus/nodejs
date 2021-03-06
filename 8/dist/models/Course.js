'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.ObjectId;

var courseSchema = new Schema({
  id: ObjectId,
  imageUrl: String,
  name: String,
  details: String
});

var Course = _mongoose2.default.model('Course', courseSchema);

exports.default = Course;