var ObjectID = require('mongodb').ObjectID

module.exports = function(app, client) {
  const db = client.db("Subjects");
  
  // Desc   -> Returns all classes from all collections (subjects)
  // Params -> none
  // Body   -> none
  // Result -> array: JSON
  app.get('/api/getAllCourses', async (req, res) => {
    let result = [];
    let collections = await db.listCollections({}, {nameOnly: true}).toArray();
    let subjects = collections.map(collection => {return collection.name})
    let waitFor = subjects.length;
    console.log(subjects.sort());
    subjects.forEach(async (subject) => {
      let dbClasses = await db.collection(subject).find({}, {projection: {_id: 0, subjectLong: 1, subjectId: 1, number: 1, title: 1}}).toArray();
      let classes = {};
      await dbClasses.forEach(docClass => {
        if(!classes[docClass.subjectLong]) {
          classes[docClass.subjectLong] = [];
          // console.log(docClass.subjectLong+': '+classes[docClass.subjectLong].length);
        }
        classes[docClass.subjectLong].push({
          number: docClass.subjectId + ' ' + docClass.number,
          title: docClass.title
        });
        if(dbClasses[dbClasses.length-1].number === docClass.number && dbClasses[dbClasses.length-1].title === docClass.title) {
          console.log('Pushed ' + subject);
          result.push(classes);
          waitFor = waitFor - 1;
          if(subject === subjects[subjects.length-1]) {
            
            console.log("GET /api/getAllCourses");
            //console.log(classes);
            res.send({classes: result});
          }
        }          
      });
    }) 
  });


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