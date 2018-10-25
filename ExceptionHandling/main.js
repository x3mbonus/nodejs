let fs = require('fs');


//How to handle exception correctly?

try {
    //console.log(x.a);
    fs.readdir(__dirname, function(){
        console.log(x.a);    
    });
    console.log("Success");
}
catch (ex) {
    console.log("Error");
}
