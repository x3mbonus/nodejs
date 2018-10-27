'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _courses = require('./courses');

var _courses2 = _interopRequireDefault(_courses);

var _lectors = require('./lectors');

var _lectors2 = _interopRequireDefault(_lectors);

var _students = require('./students');

var _students2 = _interopRequireDefault(_students);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var staticPath = _path2.default.join(__dirname, "../../static");

function addApiRoutes(app, routeName, routes) {
    app.use('/api/' + routeName, routes);
}
function pageNotFound(req, res) {
    res.status(404).sendFile(_path2.default.join(staticPath, "404.html"));
}
function register_routes(app) {
    app.use('/', _express2.default.static(staticPath));
    addApiRoutes(app, "courses", _courses2.default);
    addApiRoutes(app, "lectors", _lectors2.default);
    addApiRoutes(app, "students", _students2.default);
    app.use(pageNotFound);
}

exports.default = register_routes;