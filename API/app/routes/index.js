const courseRoutes = require('./course_routes.js');

module.exports = function(app, db) {
  courseRoutes(app, db);
}