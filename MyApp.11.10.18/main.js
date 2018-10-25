var http = require('http');

http.createServer((req, res) => {
    switch(req.method){
        case 'POST':
            res.setHeader('head1', 'postHelloWorld');
            res.write('post');

            console.log('Post request')
            break;
        case 'GET':
            res.setHeader('head2', 'getHelloWorld');

            res.writeHead(200, {"head1":"value2"});
            res.write('get');

            console.log('Get request');
            break;
        default:
            res.statusCode = 404;

    }
    res.end();
})
.listen(8080, ()=> {console.log('Listening 8080')});

function findMethod(req){
    return req;
}

function postGoHome(){

}

function getMyMethod(){

}