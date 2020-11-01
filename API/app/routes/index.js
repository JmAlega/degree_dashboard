const courseRoutes = require('./course_routes.js');
const uploadAudit = require('./uploadAudit.js')

module.exports = function(app, db) {
  courseRoutes(app, db);
  uploadAudit(app, client);
}