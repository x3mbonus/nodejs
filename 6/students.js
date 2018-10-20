var storeage = require('./storage');

exports.getStudent = function (data, callback) {
    if (!data || !data.id) {
        let message = "Cannot get student. Id is missing";
        console.error(message);
        callback(message);
    }

    storage.getStudent(data.id, callback);
};

exports.getStudents = function (data) {
    return [{
        "id": 1,
        "name": "test 1",
        "birthdate": '2012-04-23'
    }, {
        "id": 2,
        "name": "test 2",
        "birthdate": '2011-01-01'
    }]
};


exports.createStudent = function (query, student, callback) {
    if (!student) {
        let message = "Cannot add student. Data is missing";
        console.error(message);
        callback(message);
    }

    if (!student.name) {
        let message = "Cannot add student. Student name is missing";
        console.error(message);
        callback(message);
    }

    storage.createStudent(student, callback);
};

exports.deleteStudent = function (data) {
    if (!data.id) {
        let message = "Cannot delete student. Id is missing";
        console.error(message);
        return {
            success:false,
            message:message
        };
    }
    console.info(`Student "${data.id}" deleted`);
    
    return {
        success:true
    };
};



exports.updateStudent = function (data) {
    if (!data.id) {
        let message = "Cannot update student. Id is missing";
        console.error(message);
        return {
            success:false,
            message:message
        };
    }
    console.info(`Student "${data.id}" updated`);
    
    return {
        success:true
    };
};