var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {
  // Desc   -> Returns all documents within a collection
  // Params -> string: subjectId
  // Body   -> none
  // Result -> array: JSON
  app.get('/api/getCourses/:subjectId', (req, res) => {
    db.collection(req.params.subjectId).find({}).toArray()
      .then(doc => {
        res.send(doc);
        console.log("GET /api/getCourses/" + req.params.subjectId);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // Desc   -> Returns the document of the specified subject and course
  // Params -> string: subjectId, string: courseNum
  // Body   -> none
  // Result -> object: JSON
  app.get('/api/getCourse/:subjectId/:courseNum', (req, res) => {
    db.collection(req.params.subjectId).findOne({'number':req.params.courseNum})
      .then(doc => {
        res.send(doc);
        console.log("GET /api/getCourse/" + req.params.subjectId + "/" + req.params.courseNum);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // Desc   -> Updates the document specified by the JSON._id
  // Params -> none
  // Body   -> Subject collection document (JSON) w/ _id
  // Result -> Change made to database
  app.put('/api/editCourse', (req, res) => {
    const _id = req.body._id;
    delete req.body["_id"];
    db.collection(req.body.subjectId).replaceOne({'_id':ObjectID(_id)}, req.body)
      .then(doc => {
        res.send(doc.ops[0]);
        console.log("PUT /api/editCourse/" + req.body.subjectId + "/" + req.body.number);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // Desc   -> Inserts a document into the collection specified by the JSON.subjectId
  // Params -> none
  // Body   -> Subject collection document (JSON)
  // Result -> Change made to databse
  app.post('/api/addCourse', (req, res) => {
    db.collection(req.body.subjectId).insertOne(req.body)
      .then(doc => {
        res.send(doc.ops[0]);
        console.log("POST /api/addCourse/" + req.body.subjectId + "/" + req.body.number);
      })
      .catch(err => {
        res.send(err);
      });
  });
};