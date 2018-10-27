'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.ObjectId;

var studentSchema = new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
  sex: String,
  age: Number
});

var Student = _mongoose2.default.model('Student', studentSchema);

exports.default = Student;