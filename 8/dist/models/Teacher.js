'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ObjectId = Schema.ObjectId;

var teacherSchema = new Schema({
  id: ObjectId,
  fullName: String,
  photoUrl: String,
  shortDescr: String,
  longDescr: String
});

var Teacher = _mongoose2.default.model('Teacher', teacherSchema);

exports.default = Teacher;