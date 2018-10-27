'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _controllers = require('./controllers');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://localhost/my_database');

var port = 8080;

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
(0, _controllers.register_routes)(app);

app.listen(port, function () {
  console.log('Listening port ' + port);
});