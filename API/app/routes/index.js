const courseRoutes = require('./course_routes.js');
const authentication = require('./authentication.js');

module.exports = function(app, db, nodemailer) {
  courseRoutes(app, db);
  authentication(app, nodemailer);
};