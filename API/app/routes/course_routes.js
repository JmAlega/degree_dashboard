var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {
  app.post('/api/addCourse', (req, res) => {
    db.collection(req.body.subjectId).insertOne(req.body, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occured'});  
      } else {
        res.send(result.ops[0])
      }
    })
  });
};