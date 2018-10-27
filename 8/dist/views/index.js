'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.students = exports.lectors = exports.courses = undefined;

var _courses = require('./courses');

var _lectors = require('./lectors');

var _lectors2 = _interopRequireDefault(_lectors);

var _students = require('./students');

var _students2 = _interopRequireDefault(_students);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.courses = _courses.courses;
exports.lectors = _lectors2.default;
exports.students = _students2.default;