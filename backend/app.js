const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const nodemailer = require('nodemailer');
const authRoutes = require('./routes/auth.routes');
const db = require('./config/db.config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Typing Speed Test API');
});

app.post('/api/signup', async (req, res) => {
    const {formData} = req.body;
    console.log(formData);
    const { firstName, lastName, email, password } = formData;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Send a confirmation email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // e.g., 'Gmail', 'Yahoo', etc.
            auth: {
                user: 'gerald.briyolan2002@gmail.com',
                pass: 'zxuy ltvq zhjr tqip'
            }
        });

        const mailOptions = {
            from: 'gerald.briyolan2002@gmail.com',
            to: email,
            subject: 'Account Creation Successful',
            text: `Hello ${firstName},\n\nYour account has been created successfully!\n\nThank you for joining us!\n\nBest Regards,\nYour Company`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error); // Log the full error
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const {formData} = req.body;
    console.log(formData);
    const { email, password } = formData;

    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        // const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        // res.json({ token });
        
        return res.send('success');
    } catch (error) {
        console.error('Error during login:', error); // Log the full error
        res.status(400).json({ message: 'Error during login', error: error.message });
    }
});

// Test database connection
db.sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

const PORT = 7000;
db.sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
