"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.coursesRepository = undefined;

var _models = require("../models");

function all(callback) {
    return _models.Course.find(callback);
}

function get(id, callback) {
    return _models.Course.findOne({ id: id }, callback);
}

function create(values, callback) {
    var course = new _models.Course();
    course.id = values.id || 1;
    course.imageUrl = values.imageUrl || "/img/csharp.png";
    course.name = values.name || "C#";
    course.details = values.details || "programming";
    instance.save(callback);
}

function remove(id, callback) {
    var course = new _models.Course();
    _models.Course.deleteOne({ id: id }, callback);
}

function update(id, values, callback) {
    get(id, function (err, course) {
        if (err) {
            callback(err);
            return;
        }

        course.name = values.name || course.name;
        course.details = values.details || course.details;
        course.imageUrl = values.imageUrl || course.imageUrl;
        course.save(callback);
    });
}

var coursesRepository = exports.coursesRepository = {
    get: get,
    all: all,
    create: create,
    update: update,
    remove: remove
};