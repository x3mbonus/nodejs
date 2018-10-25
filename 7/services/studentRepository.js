var fs = require('fs');
let storageFolder = __dirname + "\\..\\storage";

function storageReady(callback) {
    fs.exists(storageFolder, (exists) => {
        if (!exists) {
            fs.mkdir(storageFolder, callback);
        }
        else if (callback) {
            callback();
        }
    });
}

function getMaxId(callback) {    
    fs.readdir(storageFolder, (err, files) => {
        if (err) {
            console.errror(err);
            return;
        }

        let maxId = 0;
        for (let i = 0; i < files.length; i++) {
            var id = +files[i];
            if (id > maxId && id != NaN) {
                maxId = id;
            }
        }

        if (callback) {
            callback(maxId);
        }
    });
}



function getStudent(id, callback) {
    storageReady(() => {
        let fileName = storageFolder + `\\${id}`;
        fs.exists(fileName, (exists) => {
            if (exists) {
                fs.readFile(fileName, (err, data) => {
                    if (err){
                        console.log(err);
                        callback(err);
                    } else {
                        var student;
                        try {
                            student = JSON.parse(data);                            
                            callback(undefined, student);                            
                        }
                        catch(exception){
                            console.log(exception);
                            callback(exception);                            
                        }
                    }
                })
            } else {
                callback(`Student with id ${id} not found`);
            }
        });
    });
}

function getStudents(callback) {
    storageReady(() => {
        fs.readdir(storageFolder, (err, files) => {
            if (err){
                console.log(err);
                callback(err);
                return;
            }
            let students = [];
            for (let i = 0; i < files.length; i++){
                let student = fs.readFileSync(storageFolder+"\\"+files[i]);
                students.push(JSON.parse(student));
            }
                                      
            callback(undefined, students);
        });        
    });
}

function createStudent(student, callback) {
    storageReady(() =>
        getMaxId(maxId => {
            student.id = maxId + 1;
            let filename = storageFolder + `\\${student.id}`;
            fs.writeFile(filename, JSON.stringify(student), err => callback(err, student.id));
        })
    );
}

function deleteStudent(id, callback) {
    storageReady(() => {
        let fileName = storageFolder + `\\${id}`;
        fs.exists(fileName, (exists) => {
            if (exists) {
                fs.unlink(fileName, err => {
                    if (err){
                        console.log(err);
                        callback(err);
                    } else {
                        callback();
                    }
                })
            } else {
                callback(`Student with id ${id} not found`);
            }
        });
    });
}



function updateStudent(id, student, callback) {
    storageReady(() => {
        let fileName = storageFolder + `\\${id}`;
        fs.exists(fileName, (exists) => {
            if (exists) {
                delete student.ID
                delete student.Id
                student.id = id;
                fs.writeFile(fileName, JSON.stringify(student), callback);
            } else {
                callback(`Student with id ${id} not found`);
            }
        });
    });
}


exports.getStudent = getStudent;
exports.getStudents = getStudents;
exports.createStudent = createStudent;
exports.deleteStudent = deleteStudent;
exports.updateStudent = updateStudent;