const jsdom = require("jsdom");
const util = require("util");
const { JSDOM } = jsdom;


module.exports = function(app, client) {
  const db = client.db("Authentication");

  // Desc   -> Adds degree audit to the database for a given user
  // Params -> none
  // Body   -> TYPE: form-data
  //           key: 'audit' value(file): degree_audit html file
  //           key: 'email' value(text): email
  // Result -> Degree audit is populated in databse
  app.post('/api/uploadAudit', async (req, res) => {
    try {
      if(!req.files) {
        res.send({
          status: false,
          message: 'No audit uploaded'
        });
      } else {
        let file = req.files.audit;
        //console.log(file.mimetype);
        if(file.mimetype != "text/html") {
          res.status(500).json({
            status: false,
            message: "Audit is not in HTML format"
          });
          return;
        }
        console.log("accepted audit");
        let audit = readAudit(file);
        console.log("finished parsing");
        let auditRequirements = { requirements: audit.requirements };
        db.collection('Users').findOne({'email':req.body.email})
          .then(doc => {
            db.collection('Users').update({_id:doc._id}, {$set:{degree_audit:auditRequirements}}, (err, result) => {
              if (err) {
                console.log(err); 
                res.status(500).json({error: err});
                return;
              }

              res.send({
                status: true,
                message: "Audit uploaded",
                schedule: audit.schedule
              });
            }) 
          })
          .catch(err => {
            res.status(404).json({error: 'Could not find user in database'});
          });
      }
    } catch(err) {
      res.status(500).send(err);
    }
  })
}

function readAudit (file) {
  var htmlRegex = new RegExp("html", "i");
  if(file.type && file.type.match(htmlRegex)) {
  }

  var buffer = Buffer.from(file.data);
  const auditHTML = Buffer.from(buffer).toString();
  const dom = new JSDOM(auditHTML);
  var requirements = dom.window.document.querySelectorAll("#auditRequirements .requirement");
  var reqObj = {};
  reqObj.requirements = [];
  reqObj.schedule = [];


  var startRegex = new RegExp("COMMUNICATION COMPONENT", "i");
  var startIndex = -1;
  var classesRegex = new RegExp("ALL COURSES TAKEN ON CAMPUS MUST HAVE 2.00 GPA", "i");
  var classesIndex = -1;
  requirements.forEach((requirement, index) => {
    if(requirement.querySelector(".reqHeaderTable .reqTitle").textContent.match(startRegex)) {
      startIndex = index;
    } else if(requirement.querySelector(".reqHeaderTable .reqTitle").textContent.match(classesRegex)) {
      classesIndex = index;
    }
  })

  getClassesTaken(requirements[classesIndex], reqObj);
  getClassesTaken(requirements[classesIndex+1], reqObj);
  // return reqObj;

  for(let i = startIndex; i < requirements.length-3; i++) {
    printRequirements(requirements[i], reqObj);
  }

  
  
  // `util` allows for more complete logging to see all subarrays
  console.log(reqObj);
  console.log(util.inspect(reqObj, {showHidden: false, depth: null}));

  
  
  return reqObj;
}

function getClassesTaken(requirement, reqObj) {
  var classList = requirement.querySelectorAll(".reqBody .auditSubrequirements .subrequirement .subreqBody .takenCourse");
  console.log(classList.length);
  classList.forEach(function(takenClass) {
    var courseTitle = takenClass.querySelector("td.course").textContent.trim().replace(/\s+/g, ' '); //grabs MATH 1214
    console.log('starting: ' + courseTitle);
    var firstDigit = courseTitle.search(/\d/); //looks for the 1
    courseTitle = courseTitle.substring(0, firstDigit).trim() + ' ' + courseTitle.substring(firstDigit).trim(); //in cases of COMP SCI1500, return COMP SCI 1500
    var semesterTerm = takenClass.querySelector("td.term").textContent.trim().replace(/\s+/g, ' ').substring(0,2); //returns FS from FS18
    var semesterYear = takenClass.querySelector("td.term").textContent.trim().replace(/\s+/g, ' ').substring(2); //return 18 from FS18
    var grade = takenClass.querySelector("td.grade").textContent.trim().replace(/\s+/g, ' '); //returns A|B|C|D|F|IP|EXE|EXT|T

    if(!semesterTerm.match(/AU/, 'i')) {
      if(grade.match(/EXT/, 'i')) {
        if(reqObj.schedule.filter(e => e.semester === 'Exempted Classes').length === 0) {
          reqObj.schedule.push({
            semester: 'Exempted Classes',
            classes: []
          });
        }
        // console.log('created exempted classes');
        const exemptedClassesList = reqObj.schedule.filter(e => e.semester === 'Exempted Classes');
        if(exemptedClassesList.length === 1) {
          exemptedClassesList[0].classes.push(courseTitle); 
        }
      } else if(semesterTerm === "FS") {
        if(reqObj.schedule.filter(e => e.semester === 'Fall '+semesterYear).length === 0) {
          reqObj.schedule.push({
            semester: 'Fall '+semesterYear,
            classes: []
          });
        }
        const fallClassList = reqObj.schedule.filter(e => e.semester === 'Fall '+semesterYear);
        if(fallClassList.length === 1) {
          fallClassList[0].classes.push(courseTitle);
        }
      } else if(semesterTerm === "SP") {
        if(reqObj.schedule.filter(e => e.semester === 'Spring '+semesterYear).length === 0) {
          reqObj.schedule.push({
            semester: 'Spring '+semesterYear,
            classes: []
          });
        }
        const springClassList = reqObj.schedule.filter(e => e.semester === 'Spring '+semesterYear);
        if(springClassList.length === 1) {
          springClassList[0].classes.push(courseTitle);
        }
      } else if(semesterTerm === "SS") {
        if(reqObj.schedule.filter(e => e.semester === 'Summer '+semesterYear).length === 0) {
          reqObj.schedule.push({
            semester: 'Summer '+semesterYear,
            classes: []
          });
        }
        const summerClassList = reqObj.schedule.filter(e => e.semester === 'Summer '+semesterYear);
        if(summerClassList.length === 1) {
          summerClassList[0].classes.push(courseTitle);
          //console.log('pushed ' + courseTitle);
        }
      }
      // console.log('finished: ' + courseTitle);
    }
  });
  
  return;
}

function printRequirements(requirement, reqObj) {
  var status = requirement.querySelector(".reqHeaderTable .reqStatusGroup .status").classList.value.trim(); //contains statusNO, statusIP, or statusOK
  var reqTitle = requirement.querySelector(".reqHeaderTable .reqTitle").textContent.trim(); //requirement title
  var totalSubGroupsNeeded = parseInt(requirement.getAttribute("rqdsubreq"), 10); //number of subgroups needed for requirement
  var subGroupsEarned = 0; //sub groups earned by student for requirement
  if(requirement.querySelector(".reqBody .reqEarned .subreqs.number")) {
    if(!isNaN(parseInt(requirement.querySelector(".reqBody .reqEarned .subreqs.number").textContent, 10))) {
      subGroupsEarned = parseInt(requirement.querySelector(".reqBody .reqEarned .subreqs.number").textContent, 10);
    }
  }

  var totalHoursNeeded;
  if(requirement.getAttribute("rqdhours") > 0) {
    totalHoursNeeded = parseInt(requirement.getAttribute("rqdhours"), 10);
  } else if (requirement.querySelector(".reqBody .reqNeeds")) {
    totalHoursNeeded = parseInt(requirement.querySelector(".reqBody .reqNeeds .hours.number").textContent, 10);
  } else {
    totalHoursNeeded = 0;
  }

  var totalHoursEarned = requirement.querySelector(".reqBody .reqEarned") ? parseInt(requirement.querySelector(".reqBody .reqEarned .hours.number").textContent, 10) : 0;
  var subGroups = requirement.querySelectorAll(".reqBody .auditSubrequirements .subrequirement"); //list of subrequirements for current requirement

  var currReqObj = {
    title: reqTitle,
    status: status,
    totalSubGroupsNeeded: totalSubGroupsNeeded,
    totalSubGroupsEarned: subGroupsEarned,
    totalHoursNeeded: totalHoursNeeded,
    totalHoursEarned: totalHoursEarned,
    subGroups: []
  }

  //check if the requirement has only has one subrequirement
  var singleSubReq = totalSubGroupsNeeded === 1 ? true : false;
  subGroups.forEach(function(subGroup) {
    printSubReqs(subGroup, currReqObj, singleSubReq);
  })

  //add requirement to list
  reqObj.requirements.push(currReqObj);
}

function printSubReqs(subRequirement, subReqObj, singleSubReq) {
  var subreqTitle = "";
  if(subRequirement.querySelector(".subreqBody .subreqTitle")) {
    subreqTitle = subRequirement.querySelector(".subreqBody .subreqTitle").textContent.trim();
  } else if (subReqObj.subGroups.length > 0) {
    subreqTitle = subReqObj.subGroups[subReqObj.subGroups.length-1].subGroupTitle.trim();
  } else {
    /* set from math req 16 */
    subreqTitle = subRequirement.closest(".requirement").querySelector(".reqTitle").textContent.trim();
  }
  
  var subreqStatus = subRequirement.querySelector(".subreqPretext .status").classList.value.trim(); //contains NO, IP, or OK
  var subReqTotal = subRequirement.getAttribute("rqdhours") > 0 ?  parseInt(subRequirement.getAttribute("rqdhours"), 10) : parseInt(subRequirement.getAttribute("rqdsubreq"), 10); //number of subgroups or hours

  if(singleSubReq) {
    subReqObj.totalNeeded = subReqTotal;
  }

  var currSubReqObj = {
    subGroupTitle: subreqTitle,
    subGroupStatus: subreqStatus,
    subGroupTotal: subReqTotal,
    alternative: []
  }

  var noRegex = new RegExp("No", "i");
  if(subreqStatus.match(noRegex)) {

    var subReqType = subRequirement.querySelector(".subreqBody .subreqNeeds .number").nextElementSibling.textContent.trim();
    
    var notFromCourse = subRequirement.querySelectorAll(".subreqBody .notcourses .notfromcourses .fromcourselist .course");

    var notFromCourseText = notFromCourse.length ? subRequirement.querySelector(".subreqBody .notcourses .notfromcourses .fromcourselist td").textContent.trim() : "";
    var notFromCourseNumbers = [];
    for(let i = 0; i < notFromCourse.length; i++) {
      var dept = notFromCourse[i].getAttribute("department").trim();
      var number = notFromCourse[i].getAttribute("number").trim();
      var nextNumber = i === notFromCourse.length - 1 ? "-1" : notFromCourse[i+1].getAttribute("number").trim();

      var asteriskRegex = new RegExp("\\*", "g");
      var numberRegex = number.replace(asteriskRegex, "\\*");
      var nextNumberRegex = nextNumber.replace(asteriskRegex, "\\*");

      var orRegex = new RegExp(numberRegex+"(\\s)?or(\\s)?"+nextNumberRegex, "i");
      var andRegex = new RegExp(numberRegex+"(\\s)?(&|and)(\\s)?"+nextNumberRegex, "i");
  

      if(notFromCourseText.match(orRegex)) {
        number = number + ' OR ' + nextNumber;
        i++;
      } else if(notFromCourseText.match(andRegex)) {
        number = number + ' AND ' + nextNumber;
        i++;
      }

      let courseInfo = {
        dept: dept,
        number: number
      }
      notFromCourseNumbers.push(courseInfo);
    }


    var selectFromCourse = subRequirement.querySelectorAll(".subreqBody .selectcourses .selectfromcourses .fromcourselist .course");
    var selectFromCourseText = selectFromCourse.length ? subRequirement.querySelector(".subreqBody .selectcourses .selectfromcourses .fromcourselist td").textContent : "";

    var selectFromCourseNumbers = [];
    for(let i = 0; i < selectFromCourse.length; i++) {
      var dept = selectFromCourse[i].getAttribute("department").trim();
      var number = selectFromCourse[i].getAttribute("number").trim();
      var nextNumber = i === selectFromCourse.length - 1 ? "-1" : selectFromCourse[i+1].getAttribute("number").trim();

      var asteriskRegex = new RegExp("\\*", "g");
      var numberRegex = number.replace(asteriskRegex, "\\*");
      var nextNumberRegex = nextNumber.replace(asteriskRegex, "\\*");

      var orRegex = new RegExp(numberRegex+"(\\s)?[Oo][Rr](\\s)?"+nextNumberRegex);
      var andRegex = new RegExp(numberRegex+"(\\s)?(&|[Aa][Nn][Dd])(\\s)?"+nextNumberRegex);
  
  
      if(selectFromCourseText.match(orRegex)) {
        number = number + ' OR ' + nextNumber;
        i++;
      } else if(selectFromCourseText.match(andRegex)) {
        number = number + ' AND ' + nextNumber;
        i++;
      }

      let courseInfo = {
        dept: dept,
        number: number
      }

      selectFromCourseNumbers.push(courseInfo);
    }

    currSubReqObj.subGroupReqType = subReqType;
    currSubReqObj.notFrom = notFromCourseNumbers;
    currSubReqObj.selectFrom = selectFromCourseNumbers;
  }
  if(subRequirement.querySelector(".subreqBody .completedCourses")) {
    currSubReqObj.takenCourses = []
    var takenCourses = subRequirement.querySelectorAll(".subreqBody .completedCourses .takenCourse");
    for(let i = 0; i < takenCourses.length; i++) {
      let currCourse = {
        term: takenCourses[i].querySelector(".term").textContent.trim(),
        courseNumber: takenCourses[i].querySelector(".course").textContent.trim(),
        courseName: takenCourses[i].querySelector(".description .descLine") ?
                      takenCourses[i].querySelector(".description .descLine").textContent.trim() : "",
        status: takenCourses[i].querySelector(".grade").textContent.match(/A|B|C|IP|EXT|EXE/) ? "completed" : "not completed"
      }
      currSubReqObj.takenCourses.push(currCourse);
    }
    currSubReqObj.subGroupEarned = takenCourses.length;
  }

  var altCourseRegex = new RegExp("OR", "i");
  var alternative = subRequirement.querySelector(".subreqNumber").textContent.match(altCourseRegex) ? true : false;
  
  if(alternative) {
    subReqObj.subGroups[subReqObj.subGroups.length-1].alternative.push(currSubReqObj);
  } else {
    subReqObj.subGroups.push(currSubReqObj);
  }
}