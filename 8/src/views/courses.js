import { requestHelper, coursesRepository } from '../services';

// GET /api/courses/:id
function get(req, res) {
    let id = req.params["id"];
    if (!id) {
        requestHelper.badRequest(req, res, "Cannot get course. Id is missing");
        return;
    }


    coursesRepository.get(id, function (err, item) {
        if (err) {
            requestHelper.badRequest(req, res, err);
            return;
        }
        requestHelper.success(res, item);
    });
};

// GET  /api/cources/all
function all(req, res) {
    coursesRepository.all(function (err, items) {
        if (err) {
            requestHelper.badRequest(req, res, err);
            return;
        }
        requestHelper.success(res, items);
    });
};

// POST /api/course/create
function create(req, res) {
    if (!req.body) {
        requestHelper.badRequest(req, res, "Cannot add course. Data is missing");
        return;
    }
    let course = req.body;
    if (!course.name) {
        requestHelper.badRequest(req, res, "Cannot add course. Course name is missing");
        return;
    }

    coursesRepository.create(course, function (err, id) {
        if (err) {
            requestHelper.badRequest(req, res, err);
            return;
        }
        requestHelper.success(res, id);
    });
};

// DELETE /api/course/:id
function remove(req, res) {
    let id = req.params["id"];
    if (!id) {
        requestHelper.badRequest(req, res, "Cannot delete course. Id is missing");
        return;
    }

    coursesRepository.remove(id, function (err) {
        if (err) {
            requestHelper.badRequest(req, res, err);
            return;
        }
        requestHelper.success(res);
    });
};

// POST /api/course/update/:id
function update(req, res) {
    let id = req.params["id"];
    if (!id) {
        requestHelper.badRequest(req, res, "Cannot update course. Id is missing");
        return;
    }

    if (!req.body) {
        requestHelper.badRequest(req, res, "Cannot update course. Data is missing");
        return;
    }

    let course = req.body;
    if (!course.name) {
        requestHelper.badRequest(req, res, "Cannot update course. Course name is missing");
        return;
    }

    coursesRepository.update(id, course, function (err) {
        if (err) {
            requestHelper.badRequest(req, res, err);
            return;
        }
        requestHelper.success(res);
    });
};

export let courses =
{
    get,
    all,
    create,
    update,
    remove
};