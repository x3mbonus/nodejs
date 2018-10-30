import { Student } from '../models'

// GET /api/students/:id
async function get(req, res) {
    let id = req.params.id;
    if(!id){
        res.status(404).json({Error: `Cannot get student. Id is missing`});
        return;
    }
    try {
        let student = await Student.findById(id);
        if (!student)
        {
            res.status(404).json({Error: `Cannot find student with id ${id}`});
            return;
        }
        res.status(200).json(student);
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Something went wrong."});
    }
};

// GET  /api/students/all
async function all(req, res) {
    try {
        let students = await Student.find({});
        res.status(200).json(students);
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Something went wrong."});
    }
}


// POST /api/students/create
async function create(req, res) {
    let studentParam = req.body;
    if(!studentParam){
        res.status(400).json({Error: "Cannot add student. Data is missing"});
        return;
    }
    try {
        let student = new Student(studentParam);

        let err = student.validateSync();
        if (err) {
            res.status(409).json({Error: "Student is not valid.", Message: err});
            return;
        }
        let result = await student.save();

        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "User was not created due to internal server error"});
    }
};

// DELETE /api/students/:id
async function remove(req, res) {
    let id = req.params.id;
    if(!id){
        res.status(404).json({Error: `Cannot delete student. Id is missing`});
        return;
    }
    
    try {
        let result = await Student.findByIdAndDelete(id);
        res.status(200).json(result);
    }
    catch(ex){
        console.log(err);
        res.status(500).json({Error: "User was not deleted due to internal server error"});
    }
};

// POST /api/students/update/:id
async function update(req, res) {
    let id = req.params.id;
    if(!id){
        res.status(404).json({Error: `Cannot update student. Id is missing`});
        return;
    }

    let student = req.body;
    if(!student){
        res.status(400).json({Error: "Cannot update student. Data is missing"});
        return;
    }

    try {
        
        let result = await Student.findOneAndUpdate({_id: id}, student);        

        res.status(200).json(result);
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "User was not updated due to internal server error"});
    }
};

export let students =
{
    get,
    all,
    create,
    update,
    remove
};