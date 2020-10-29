const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string')

module.exports = function(app, client, nodemailer) {
  const db = client.db("Authentication");

  // Desc   -> Signs in existing user, checking authentication status
  // Params -> none
  // Body   -> email, username, password
  // Result -> Return whether user is authenticated or not
  app.get('/api/loginUser/:user', (req,res) => {
    db.collection('Users').findOne({'username':req.params.user})
      .then(doc => {
        if (doc != null) {
          res.send(doc);
        } else {
          res.status(401).json({error: 'User not authenticated!'});
        }
      })
      .catch(err => {
        res.status(404).json({error: 'Could not find user in database'});
      });
  });
  
  // Desc   -> Signs up a new user
  // Params -> none
  // Body   -> email, username, password, degree audit (object)
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
                  "username": `${req.body.username}`,
                  "password": `${hash}`,
                  "degree_audit": req.body.degree_audit,
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
  // Body   -> target email, userName, unique code
  // Result -> Email sent to user
  app.post('/api/sendEmail', (req, res) => {
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
        Hello User ${req.body.userName}.
        Thank you for trying to sign up.
        This is the unique code you will need to enter: ${req.body.code}
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
  });
};
