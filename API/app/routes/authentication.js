module.exports = function(app, nodemailer) {
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