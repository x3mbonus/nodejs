const Router = require('express').Router;
const student = require('../views').student;

var router = new Router();

router.route("/all").get(student.getStudents);
router.route("/create").post(student.createStudent);
router.route("/delete/:id").delete(student.deleteStudent);
router.route("/update/:id").put(student.updateStudent);
router.route("/:id").get(student.getStudent);

exports.router = router;