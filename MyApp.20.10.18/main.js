// get post put delete -> string ""
let express = require('express');
let bodyParser = require('body-parser');
const port = 8080;

let app = new express();

let router = express.Router();



router.route("/")
    .get(function(req, res){
        res.send(`Get response for ${req.url}`);
    })
    .post(function(req, res){
        res.send(`Post response for ${req.url}`);
    })
    .put(function(req, res){
        res.send(`Put response for ${req.url}`);
    })
    .delete(function(req, res){
        res.send(`Delete response for ${req.url}`);
    });
    
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {console.log(`Listening port ${port}`); })