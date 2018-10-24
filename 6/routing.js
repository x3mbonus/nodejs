let 
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE";

var students = require('./students');

exports.routes = [
    {
        path: "/api/student/all",
        method: GET,
        handle: students.getStudents
    },    
    {
        path: "/api/student/get",
        method: GET,
        handle: students.getStudent
    },
    {
        path: "/api/student/create",
        method: POST,
        handle: students.createStudent
    },        
    {
        path: "/api/student/update",
        method: PUT,
        handle: students.updateStudent
    },        
    {
        path: "/api/student/delete",
        method: DELETE,
        handle: students.deleteStudent
    }
];