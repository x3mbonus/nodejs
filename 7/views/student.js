var studentRepository = require('../services').studentRepositrory;

function badRequest(req, res, message){
    console.info(`Error in request ${req.method} ${req.url}: ${message}`);
    res.statusCode = 400;
    sendJson(res, {Success: false, Message: message});
}

function success(res, json)
{
    if (json) {
        sendJson(res, {Success: true, Result: json});
    }
    else {
        sendJson(res, {Success: true});
    }
    
}

function sendJson(res, json){
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(json));
    res.end();
}

// GET /api/student?id=1
exports.getStudent = function (req, res) {
    let id = req.params["id"];
    if (!id) {
        badRequest(req, res, "Cannot get student. Id is missing");
        return;
    }
    

    studentRepository.getStudent(id, function (err, student){
        if (err) {
            badRequest(req, res, err);
            return;
        }
        success(res, student);
    });
};

// GET  /api/student/all
exports.getStudents = function (req, res) {
    studentRepository.getStudents(function (err, students){
        if (err) {
            badRequest(req, res, err);
            return;
        }
        success(res, students);
    });
};

// POST /api/student/create { name"="Alex", "birthdate"="2012-04-23"}
exports.createStudent = function (req, res) {
    if (!req.body) {
        badRequest(req, res, "Cannot add student. Data is missing");
        return;
    }
    let student = req.body;
    if (!student.name) {
        badRequest(req, res, "Cannot add student. Student name is missing");
        return;
    }

    studentRepository.createStudent(student, function (err, id){
        if (err) {
            badRequest(req, res, err);
            return;
        }
        success(res, id);
    });
};

// DELETE /api/student?id=1
exports.deleteStudent = function (req, res) {
    let id = req.params["id"];
    if (!id) {
        badRequest(req, res, "Cannot delete student. Id is missing");
        return;
    }
    
    studentRepository.deleteStudent(id, function (err){
        if (err) {
            badRequest(req, res, err);
            return;
        }
        success(res);
    });
};

// POST /api/student/update?id=1 { name"="Alex", "birthdate"="2012-04-23"}
exports.updateStudent = function (req, res) {
    let id = req.params["id"];
    if (!id) {
        badRequest(req, res, "Cannot update student. Id is missing");
        return;
    }    
    
    if (!req.body) {
        badRequest(req, res, "Cannot update student. Data is missing");
        return;
    }

    let student = req.body;
    if (!student.name) {
        badRequest(req, res, "Cannot update student. Student name is missing");
        return;
    }
    
    studentRepository.updateStudent(id, student, function (err){
        if (err) {
            badRequest(req, res, err);
            return;
        }
        success(res);
    });
};