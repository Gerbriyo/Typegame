const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/send-results', async (req, res) => {
  const { email, mistakes, wpm, cpm } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Typing Test Results',
    text: `Hello,

Here are your typing test results:

- Mistakes: ${mistakes}
- Words Per Minute (WPM): ${wpm}
- Characters Per Minute (CPM): ${cpm}

Thank you for participating!

Best Regards,
Your Typing Test Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Results sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send results', error: error.message });
  }
});
