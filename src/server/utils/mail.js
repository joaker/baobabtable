'use strict';
const nodemailer = require('nodemailer');
const {EMAIL_USER, EMAIL_PASS} = process.env;

console.log('EMAIL USER is: ', EMAIL_USER);
console.log('EMAIL PASS is: ', EMAIL_PASS);

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    }
});



const createOptions = ({name, email, body}) => {

  const parts = ["name", name, "email", email, "description", body];
  const text = parts.join('\n');
  const html = parts.map(p => `<p>${p}</p>`).join('\n');

  // setup email data with unicode symbols
  let mailOptions = {
      from: `Baobab Table Registration <${EMAIL_USER}>`, // sender address
      to: 'jooakley@gmail.com, sityavyar@gmail.com', // list of receivers
      subject: `New Registration: ${name} (${email})` , // Subject line
      text: text, // plain text body
      html: html, // html body
  };
  return mailOptions;
}

const send = (options) => {
  return new Promise((resolve, reject) => {
    // send mail with defined transport object
    transporter.sendMail(options, (error, info) => {
      if(error){
        console.log(error);
        resolve(error);
        return;
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  });
};

const register = (fields) => {
  const options = createOptions(fields);
  return send(options);
}

module.exports = {
  register,
};
