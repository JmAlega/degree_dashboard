const courseRoutes = require('./course_routes.js');
const userRoutes = require('./user_routes.js'); 
const scheduleRoutes = require('./schedule_routes.js');
const uploadAudit = require('./uploadAudit_routes.js')

module.exports = function(app, client, nodemailer) {
  courseRoutes(app, client);
  userRoutes(app, client, nodemailer);
  scheduleRoutes(app, client);
  uploadAudit(app, client);
};

