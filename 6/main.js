// Создайте REST API, испльзуя можель http, которое позволит вам создавать новых студентов, удалять существующих, обновлять информацию о студентах, и получать студентов как всех существующих так и по id, все возможные ошибки при запросах постарайтесь обработать и вернуть ошибку клиенту с описанием, что было сделано не правильно. Сервер должен логировать все действия пользователя (запрос на создание, запрос на удаление и т.д.) всю эту информацию нужно записывать в файл.
// также когда происходить запись в файл, в консоли должно появится уведомление что логи записаны, попрробуйте сделать это через EventEmitter

// GET  /api/student?id=1
// GET  /api/student/all
// POST /api/student/create { name"="Alex", "birthdate"="2012-04-23"}
// PUT  /api/student/update?id=1 {"name"="Alex", "birthdate"="2012-04-23"}
// DELETE /api/student?id=1
//


let http = require('http');
let url = require('url');
let log = require('./log');
let routing = require('./routing');

let port = 8080;

function tryExtendRequest(req, res, callback){
    req.query = url.parse(req.url, true).query
    if (req.method == "GET" ||
        req.method == "DELETE")
    {
        callback(req, res);
    }
    req.on('data', function (data) {
        try {                
            req.body = JSON.parse(data.toString());            
        } catch (error) {
            log.error(error);            
            res.statusCode = 400;
            res.write("Cannot parse body of request. Body should be valid json")
            res.end();
            return;
        }
        callback(req, res);
    });
}

function findRoute(req){    
    var routes = routing.routes;    
    var urlParams = url.parse(req.url, true);
    for(let i = 0; i < routes.length; i++)
    {
        if (urlParams.path.startsWith(routes[i].path) &&
            routes[i].method == req.method)
        {
            return routes[i];
        }        
    }    
}

(function initEvents() {
    log.on(log.events.error, message => {
        console.error(message);
    });
})()

http.createServer(function (req, res){
    log.error("Test error");
    log.warn("Test warning");
    log.info("Test info");


    tryExtendRequest(req, res, function (req, res){
        var route = findRoute(req) || {};
        if (route.handle)
        {
            try {
                route.handle(req, res);
            }
            catch(ex)
            {
                res.statusCode = 500;
                res.write(`Internal server error ${ex}`);
                console.log(ex);
                res.end();
            }
        }
        else
        {
            res.statusCode = 404;
            res.write(`Cannot handle "${req.url}" with method "${req.method}"`);
            res.end();
        }
    });
}).listen(port, function () {
    console.log(`Listening port ${port}`);
});

