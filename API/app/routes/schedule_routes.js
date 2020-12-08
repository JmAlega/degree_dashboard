const { v4: uuidv4} = require('uuid');

module.exports = function(app, client) {
  const dbReports = client.db("Reports");
  const dbUsers = client.db("Authentication");
  // Schedule Schema Example:
  // {
  //   "schedule": {
  //       "Fall 2020": {
  //           "COMP SCI": ["1570", "1580"],
  //           "ENGLISH": ["1160"],
  //           "MATH": ["1215"]
  //       },
  //       "Sprint 2021": {
  //           "COMP SCI": ["1575", "1585"],
  //           "MATH": ["1215"]
  //       }
  //   }
  // } 

  // Desc   -> Adds schedule into database
  // Params -> none
  // Body   -> email, schedule name, schedule object
  // Result -> Schedule is added to databse
  app.post('/api/addSchedule', (req, res) => {
    // First check to see if email exists in database
    dbUsers.collection('Users').findOne({'email':req.body.email})
      .then(doc => {
        if (doc != null) {
          let obj = req.body;
          obj.schedule_id = uuidv4();
          dbReports.collection("Schedules").insertOne(obj)
            .then(doc => {
              res.send(doc);
              console.log("POST /api/addSchedule " + obj.schedule_id);
            })
            .catch(err => {
              res.send(err);
            });
        } else {
          res.status(401).json({error: 'Email not found!'});
        }
      })
  });

  // Desc   -> Adds a course to a specific schedule of a user
  // Params -> none
  // Body   -> schedule id, semester, course name & number
  // Result -> Adds course to schedule
  app.put('/api/addCourseSchedule', (req, res) => {
    dbReports.collection('Schedules').findOne({'schedule_id':req.body.schedule_id})
      .then(doc => {
        if (doc != null) {
          let schedule = doc.schedule
          console.log(schedule)
          schedule[req.body.semester][req.body.subject].push(req.body.course_num)
          dbReports.collection('Schedules').update({_id:doc._id}, {$set:{schedule:schedule}}, (err, result) => {
            if (err) {
              console.log(err); 
              res.status(500).json({error: err});
              return;
            }

            res.send({status: 'Added Course'});
          })
        } else {
          res.status(401).json({error: 'Schedule not found!'});
        }
      })
  });

  // Desc   -> Deletes a course of a specific schedule
  // Params -> none
  // Body   -> schedule id, semester, course name & number
  // Result -> Course is deleted from schedule
  app.put('/api/deleteCourseSchedule', (req, res) => {
    dbReports.collection('Schedules').findOne({'schedule_id':req.body.schedule_id})
      .then(doc => {
        if (doc != null) {
          let schedule = doc.schedule
          console.log(schedule)
          let arr = schedule[req.body.semester][req.body.subject]
          const index = arr.indexOf(req.body.course_num)
          schedule[req.body.semester][req.body.subject].splice(index, 1)

          dbReports.collection('Schedules').update({_id:doc._id}, {$set:{schedule:schedule}}, (err, result) => {
            if (err) {
              console.log(err); 
              res.status(500).json({error: err});
              return;
            }

            res.send({status: 'Deleted Course'});
          })
        } else {
          res.status(401).json({error: 'Schedule not found!'});
        }
      })
  });

  // Desc   -> Gets all schedules of a paticular user
  // Params -> email
  // Body   -> none
  // Result -> Returns an array of objects
  //           Each object contains:  schedule_id, schedule_name, schedule
  app.get('/api/getSchedules/:email', (req, res) => {
    // First check to see if email exists in database
    dbUsers.collection('Users').findOne({'email':req.params.email})
      .then(async (doc) => {
        if (doc != null) {
          var cursor = dbReports.collection("Schedules").find({email:req.params.email});
          var schedules = await loadSchedules(cursor);
          res.json(schedules);
        } else {
          res.status(401).json({error: 'Email not found!'});
        }
      })
  });

  // Desc   -> Deletes a schedule
  // Params -> Schedule Id
  // Body   -> none
  // Result -> Schedule is deleted from database
  app.delete('/api/deleteSchedule/:scheduleId', (req, res) => {
    dbReports.collection("Schedules").findOne({'schedule_id':req.params.scheduleId})
      .then(doc => {
        if (doc != null) {
          dbReports.collection("Schedules").deleteOne({_id:doc._id})
            .then(doc => {
              console.log("POST /api/deleteSchedule " + req.params.scheduleId);
              res.send('Schedule Deleted');
            })
            .catch(err => {
              res.status(500).send({error: err});
            })
        } else {
          res.status(401).json({error: 'Schedule ID not found'});
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
  });
};

// Asynchronous function to load the schedules for front-end
async function loadSchedules(cursor) {
  var scheduleArray = [];
  while (await cursor.hasNext()) {
    try {
      let doc = await cursor.next();
      let obj = {
        "schedule_id": doc.schedule_id,
        "schedule_name": doc.schedule_name,
        "schedule": doc.schedule
      }
      scheduleArray.push(obj);
      console.log('here', scheduleArray);
    } catch (err) {
      console.log(err);
    }
  }

  console.log('inside async', scheduleArray);
  return scheduleArray;
}