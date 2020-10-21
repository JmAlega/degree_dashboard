const courseRoutes = require('./course_routes.js');
const authentication = require('./authentication.js')

module.exports = function(app, db) {
  courseRoutes(app, db);
}

module.exports = function(app, nodemailer) {
  authentication(app, nodemailer);
}