require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse request body
// app.use(bodyParser.json());
// Parse application/json
app.use(express.json());

// Parse application/x-www-form-urlencoded (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve JavaScript files from the 'scripts' directory
app.use('/js', express.static(path.join(__dirname, 'js')));


// Route to serve the landing page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the contact page (index2.html)
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});

// Nodemailer transport configuration (Example: Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables
    pass: process.env.EMAIL_PASS, // Use environment variables
  },
});

// POST endpoint to send emails
app.post('/email', (req, res) => {
  const { nameInput, emailInput, countryInput, phoneInput, messageinput } = req.body;

  // Compose email details
  const mailOptions = {
    from: emailInput, // Sender's email address
    to: 'thekernelhub@gmail.com', // Your email address where you want to receive the messages
    subject: `Message from ${nameInput} (${emailInput})`, // Email subject
    text: `
      Name: ${nameInput}
      Email: ${emailInput}
      Country: ${countryInput}
      Phone: ${phoneInput}
      Message: ${messageinput}
    `, // Email body in plain text
  };

  // Send the email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Start the server
// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });
