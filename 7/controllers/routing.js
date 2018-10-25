var studentRoutes = require('./student').router;

function addApiRoutes(app, routeName, routes){
    app.use(`/api/${routeName}`, routes);
}

function registerRoutes(app) {
    addApiRoutes(app, "student", studentRoutes);
}

//export default registerRoutes;
exports.registerRoutes = registerRoutes;