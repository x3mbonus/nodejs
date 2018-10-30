import { Course } from '../models'

// GET /api/courses/:id
async function get(req, res) {
    let id = req.params.id;
    if(!id){
        res.status(404).json({Error: `Cannot get course. Id is missing`});
        return;
    }
    try {
        let course = await Course.findById(id);
        if (!course)
        {
            res.status(404).json({Error: `Cannot find course with id ${id}`});
            return;
        }
        res.status(200).json(course);
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Something went wrong."});
    }
};

// GET  /api/courses/all
async function all(req, res) {
    try {
        let courses = await Course.find({});
        res.status(200).json(courses);
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "Something went wrong."});
    }
}


// POST /api/courses/create
async function create(req, res) {
    let courseParam = req.body;
    if(!courseParam){
        res.status(400).json({Error: "Cannot add course. Data is missing"});
        return;
    }
    try {
        let course = new Course(courseParam);

        let err = course.validateSync();
        if (err) {
            res.status(409).json({Error: "Course is not valid.", Message: err});
            return;
        }
        let result = await course.save();

        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "User was not created due to internal server error"});
    }
};

// DELETE /api/courses/:id
async function remove(req, res) {
    let id = req.params.id;
    if(!id){
        res.status(404).json({Error: `Cannot delete course. Id is missing`});
        return;
    }
    
    try {
        let result = await Course.findByIdAndDelete(id);
        res.status(200).json(result);
    }
    catch(ex){
        console.log(err);
        res.status(500).json({Error: "User was not deleted due to internal server error"});
    }
};

// POST /api/courses/update/:id
async function update(req, res) {
    let id = req.params.id;
    if(!id){
        res.status(404).json({Error: `Cannot update course. Id is missing`});
        return;
    }

    let course = req.body;
    if(!course){
        res.status(400).json({Error: "Cannot update course. Data is missing"});
        return;
    }

    try {
        
        let result = await Course.findOneAndUpdate({_id: id}, course);        

        res.status(200).json(result);
        return;
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: "User was not updated due to internal server error"});
    }
};

export let courses =
{
    get,
    all,
    create,
    update,
    remove
};