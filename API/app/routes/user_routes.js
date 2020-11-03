const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string')

module.exports = function(app, client, nodemailer) {
  const db = client.db("Authentication");
  
  // Desc   -> Activates a user
  // Params -> none
  // Body   -> email, activation code
  // Result -> Return whether or nto a user is successfully activated
  app.post('/api/activateUser', (req, res) => {
    db.collection('Users').findOne({'email':req.body.email})
      .then(doc => {
        if (doc != null) {
          if (req.body.activationCode == doc.activation_code) {
            db.collection('Users').update({_id:doc._id}, {$set:{activation_status:true}}, (err, result) => {
              if (err) {
                console.log(err); 
                res.status(500).json({error: err});
                return;
              }

              console.log(result);
              res.send('User Successfully Activated');
            })
          } else {
            res.status(401).json({error: 'Incorrect Activation Code'});
          }
        } else {
          res.status(401).json({error: 'Email not found!'});
        }
      })
  })

  // Desc   -> Signs in existing user, checking authentication status
  // Params -> username
  // Body   -> none
  // Result -> Return whether user is authenticated or not
  app.post('/api/loginUser', (req,res) => {
    db.collection('Users').findOne({'email':req.body.email})
      .then(doc => {
        if (doc != null) {
          // Found user's email
          bcrypt.compare(req.body.password, doc.password, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({error: err});
              return;
            }

            if (result == true) {
              res.send('Successful Login');
            } else {
              res.status(401).json({error: 'Email or Password incorrect'});
            }
          }) 
        } else {
          res.status(401).json({error: 'Email not found!'});
        }
      })
      .catch(err => {
        res.status(500).json({error: err});
      });
  });
  
  // Desc   -> Signs up a new user
  // Params -> none
  // Body   -> email, password, first name, last name
  // Result -> New user added to database
  app.post('/api/createUser', (req, res) => {
    // First check to see if user already exists 
    db.collection('Users').findOne({'email': req.body.email})
      .then(doc => {
        // User already exists
        if (doc != null) {
          res.status(403).send('User with specified email already exists!');
        } else {
          // New User

          // Hash password
          bcrypt.genSalt(Number(process.env.SALT_ROUNDS), (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) {
                console.log(err);
                res.status(500).send("Hashing Error");
              } else {
                // Create a new user object
                const activationCode = cryptoRandomString({length: 10, type: 'distinguishable'});
                let user = {
                  "email": `${req.body.email}`,
                  "first_name": `${req.body.firstName}`,
                  "last_name": `${req.body.lastName}`,
                  "password": `${hash}`,
                  "degree_audit": {},
                  "activation_code": `${activationCode}`,
                  "activation_status": false
                };
                
                // Insert user into database
                db.collection('Users').insertOne(user)
                .then(doc => {
                  res.send(doc.ops[0]);
                  console.log("POST /api/createUser/" + req.body.email);
                })
                .catch(err => {
                  res.status(403).json({error: 'Could not insert user into database'});
                });
              }
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({error: 'Could not find user in database'});
      });
  });

  // Desc   -> Sends a confirmation email to user with unique code
  // Params -> none
  // Body   -> target email
  // Result -> Email sent to user
  app.post('/api/sendEmail', (req, res) => {
    db.collection('Users').findOne({'email': req.body.email})
      .then(doc => {
        if (doc != null) {
          let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: `${process.env.EMAIL}`,
              pass: `${process.env.EMAIL_PASS}`
            }
          });
          
          let mailOptions = {
            from: `"Degree Dashboard" <${process.env.EMAIL}>`,
            to: `${req.body.email}`,
            subject: 'Test email from Degree Dashboard',
            text: 'plain text here',
            html: 
            `
            <p>
              Thank you for trying to sign up.
              This is the unique code you will need to enter: ${doc.activation_code}
            </p>
            `
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              res.status(400).send('Error in sending email');
              return console.log(error);
            }
        
            res.status(200).send('Email Sent');
          });
        } else {
          console.log('User does not exist');
        }
      })
      .catch(err => {
        console.log(err);
      })
  });
};
