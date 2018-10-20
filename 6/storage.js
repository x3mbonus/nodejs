var fs = require('fs');
let storageFolder = __dirname + "\\students";

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
    storageReady(() =>
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
        }));
}

function createStudent(student, callback) {
    getMaxId(maxId => {
        student.id = maxId + 1;
        let filename = storageFolder + `\\${student.id}`;
        fs.writeFile(filename, JSON.stringify(student), callback);
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
                callback('File not exists');
            }
        });
    });
}


exports.createStudent = createStudent;
exports.getStudent = getStudent;