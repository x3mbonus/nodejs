// Создайте REST API, испльзуя можель http, которое позволит вам создавать новых студентов, удалять существующих, обновлять информацию о студентах, и получать студентов как всех существующих так и по id, все возможные ошибки при запросах постарайтесь обработать и вернуть ошибку клиенту с описанием, что было сделано не правильно. Сервер должен логировать все действия пользователя (запрос на создание, запрос на удаление и т.д.) всю эту информацию нужно записывать в файл.
// также когда происходить запись в файл, в консоли должно появится уведомление что логи записаны, попрробуйте сделать это через EventEmitter

// GET  /api/student/1
// GET  /api/student/all
// POST /api/student/create { name"="Alex", "birthdate"="2012-04-23"}
// PUT  /api/student/1/update {"name"="Alex", "birthdate"="2012-04-23"}
// DELETE /api/student/1
//


var http = require('http');
var fs = require('fs');
var url = require('url');
var routing = require('./routing');


let port = 8080;



http.createServer((req, res) => {
    var routes = routing.routes;
    let urlParams = url.parse(req.url, true);
    let route = undefined;
    for(let i = 0; i < routes.length; i++)
    {
        if (urlParams.path.startsWith(routes[i].path) &&
            routes[i].method == req.method)
        {
            route = routes[i];
            break;
        }        
    }
    if (route &&
        route.handle)
    {
        req.on('data', function (data) {
            let body = data.toString();
            let params = {};
            try {                
                params = JSON.parse(body);
            } catch (error) {
                console.error(error);
                res.statusCode = 400;
                res.write("Cannot parse body of request. Body should be valid json")
                res.end();
                return;
            }
            
            route.handle(urlParams.query, params, (err, result) => {
                if (err){
                    res.statusCode = 500; //400?
                    res.write(err);
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(result));                    
                }
                res.end();
            });

            
        });
        return;
    }
    else
    {
        res.statusCode = 404;
    }    
    res.end();
}).listen(port, function () {
    console.log(`Listening port ${port}`);
});

