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
        let audit = readAudit(req.files.audit);
        db.collection('Users').findOne({'email':req.body.email})
          .then(doc => {
            db.collection('Users').update({_id:doc._id}, {$set:{degree_audit:audit}}, (err, result) => {
              if (err) {
                console.log(err); 
                res.status(500).json({error: err});
                return;
              }

              res.send({
                status: true,
                message: "Audit uploaded",
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

  var startRegex = new RegExp("Communication component", "i")
  var startIndex = -1;
  requirements.forEach((requirement, index) => {
    if(requirement.querySelector(".reqHeaderTable .reqTitle").textContent.match(startRegex)) {
      startIndex = index;
    }
  })
  for(let i = startIndex; i < requirements.length-3; i++) {
    printRequirements(requirements[i], reqObj);
  }
  
  // `util` allows for more complete logging to see all subarrays
  console.log(reqObj);
  console.log(util.inspect(reqObj, {showHidden: false, depth: null}));
  
  return reqObj;
}

function printRequirements(requirement, reqObj) {
  var status = requirement.querySelector(".reqHeaderTable .reqStatusGroup .status").classList.value; //contains statusNO, statusIP, or statusOK
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
    subreqTitle = subRequirement.querySelector(".subreqBody .subreqTitle").textContent;
  } else if (subReqObj.subGroups.length > 0) {
    subreqTitle = subReqObj.subGroups[subReqObj.subGroups.length-1].subGroupTitle;
  } else {
    /* set from math req 16 */
    subreqTitle = subRequirement.closest(".requirement").querySelector(".reqTitle").textContent;
  }
  
  var subreqStatus = subRequirement.querySelector(".subreqPretext .status").classList.value; //contains NO, IP, or OK
  var subReqTotal = subRequirement.getAttribute("rqdhours") > 0 ?  subRequirement.getAttribute("rqdhours") : subRequirement.getAttribute("rqdsubreq");

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

    var subReqType = subRequirement.querySelector(".subreqBody .subreqNeeds .number").nextElementSibling.textContent;
    
    var notFromCourse = subRequirement.querySelectorAll(".subreqBody .notcourses .notfromcourses .fromcourselist .course");

    var notFromCourseText = notFromCourse.length ? subRequirement.querySelector(".subreqBody .notcourses .notfromcourses .fromcourselist td").textContent : "";
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
        term: takenCourses[i].querySelector(".term").textContent,
        courseNumber: takenCourses[i].querySelector(".course").textContent,
        courseName: takenCourses[i].querySelector(".description .descLine") ?
                      takenCourses[i].querySelector(".description .descLine").textContent : "",
        status: takenCourses[i].querySelector(".grade").textContent.match(/A|B|C|IP|EXT|E/) ? "completed" : "not completed"
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