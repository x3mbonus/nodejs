import {Course} from '../models';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;


function all(callback) {
    return Course.find(callback);
}


function get(id, callback) {
    return Course.findOne({id : id}, callback);
}


function create(values, callback) {
    const course = new Course();
    course.id = new ObjectId();
    course.imageUrl = values.imageUrl || "/img/csharp.png";
    course.name = values.name || "C#";
    course.details = values.details || "programming";
    course.save(callback);
}

function remove(id, callback) {
    const course = new Course();
    Course.deleteOne({ id: id}, callback);
}


function update(id, values, callback) {
    get(id, function(err, course){
        if (err){
            callback(err);
            return;
        }

        course.name = values.name || course.name;
        course.details = values.details || course.details;
        course.imageUrl = values.imageUrl || course.imageUrl;
        course.save(callback);
    });
}



export let coursesRepository = {
    get,
    all,
    create,
    update,
    remove
};