const courseRoutes = require('./course_routes.js');
const schedule_routes = require('./schedule_routes.js');
const userRoutes = require('./user_routes.js'); 
const scheduleRoutes = require('./schedule_routes.js');

module.exports = function(app, client, nodemailer) {
  courseRoutes(app, client);
  userRoutes(app, client, nodemailer);
  schedule_routes(app, client);
};