"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.courses = undefined;

var _services = require("../services");

// GET /api/courses/:id
function get(req, res) {
    var id = req.params["id"];
    if (!id) {
        _services.requestHelper.badRequest(req, res, "Cannot get course. Id is missing");
        return;
    }

    _services.coursesRepository.get(id, function (err, item) {
        if (err) {
            _services.requestHelper.badRequest(req, res, err);
            return;
        }
        _services.requestHelper.success(res, item);
    });
};

// GET  /api/cources/all
function all(req, res) {
    _services.coursesRepository.all(function (err, items) {
        if (err) {
            _services.requestHelper.badRequest(req, res, err);
            return;
        }
        _services.requestHelper.success(res, items);
    });
};

// POST /api/course/create
function create(req, res) {
    if (!req.body) {
        _services.requestHelper.badRequest(req, res, "Cannot add course. Data is missing");
        return;
    }
    var course = req.body;
    if (!course.name) {
        _services.requestHelper.badRequest(req, res, "Cannot add course. Course name is missing");
        return;
    }

    _services.coursesRepository.create(course, function (err, id) {
        if (err) {
            _services.requestHelper.badRequest(req, res, err);
            return;
        }
        _services.requestHelper.success(res, id);
    });
};

// DELETE /api/course/:id
function remove(req, res) {
    var id = req.params["id"];
    if (!id) {
        _services.requestHelper.badRequest(req, res, "Cannot delete course. Id is missing");
        return;
    }

    _services.coursesRepository.remove(id, function (err) {
        if (err) {
            _services.requestHelper.badRequest(req, res, err);
            return;
        }
        _services.requestHelper.success(res);
    });
};

// POST /api/course/update/:id
function update(req, res) {
    var id = req.params["id"];
    if (!id) {
        _services.requestHelper.badRequest(req, res, "Cannot update course. Id is missing");
        return;
    }

    if (!req.body) {
        _services.requestHelper.badRequest(req, res, "Cannot update course. Data is missing");
        return;
    }

    var course = req.body;
    if (!course.name) {
        _services.requestHelper.badRequest(req, res, "Cannot update course. Course name is missing");
        return;
    }

    _services.coursesRepository.updatecourse(id, course, function (err) {
        if (err) {
            _services.requestHelper.badRequest(req, res, err);
            return;
        }
        _services.requestHelper.success(res);
    });
};

var courses = exports.courses = {
    get: get,
    all: all,
    create: create,
    update: update,
    remove: remove
};