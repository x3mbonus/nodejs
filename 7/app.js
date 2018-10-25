// оздайте базовую структуру проекта, которую я показывал на предыдущем занятии, все содержимое каждого каталога должно экспортироваться и импортироваться через index файл
// попробуйте разобраться как работает import export
// https://learn.javascript.ru/modules
// Модули
// [Photo]
// и использовать его при импорте экспорте модулей


const express = require('express');
const bodyParser = require('body-parser');
const routing = require('./controllers').routing;
const port = 8080;

let app = express();
app.use(bodyParser.json());
routing.registerRoutes(app);

app.listen(port, ()=> {console.log(`Listening port ${port}`)});


