let 
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE";

var students = require('./students');

exports.routes = [
    // GET  /api/student/1
// GET  /api/student/all
// POST /api/student/create { name"="Alex", "birthdate"="2012-04-23"}
// PUT  /api/student/1/update {"name"="Alex", "birthdate"="2012-04-23"}
// DELETE /api/student/1
    {
        path: "/api/student/get/all",
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