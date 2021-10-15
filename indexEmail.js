var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtpdti.url.edu.gt',
  port: 25,
  //secure: true
  auth: {
    user: '',
    pass: ''
  }
});

var mailOptions = {
  from: 'incyt@url.edu.gt',
  to: 'hsgonzalez@correo.url.edu.gt',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

