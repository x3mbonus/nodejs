import express from 'express';
import path from 'path';
import coursesRoutes from './courses';
import lectorsRoutes from './lectors';
import studentsRoutes from './students';

const staticPath = path.join(__dirname ,"../../static");

function addApiRoutes(app, routeName, routes){
    app.use(`/api/${routeName}`, routes);
}
function pageNotFound(req, res){
    res.status(404).sendFile(path.join(staticPath ,"404.html"));
}
function register_routes(app) {
    app.use('/', express.static(staticPath));    
    addApiRoutes(app, "courses", coursesRoutes);
    addApiRoutes(app, "lectors", lectorsRoutes);
    addApiRoutes(app, "students", studentsRoutes);
    app.use(pageNotFound);
}

export default register_routes;