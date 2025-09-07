const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const JWT_SECRET = 'your_jwt_secret'; // Replace with a strong secret

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Data files
const announcementsFilePath = path.join(__dirname, 'announcements.json');
const eventsFilePath = path.join(__dirname, 'events.json');
const usersFilePath = path.join(__dirname, 'users.json');
const timetableFilePath = path.join(__dirname, 'timetable.json');

// Helper function to read data from JSON file
const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Helper function to write data to JSON file
const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Admin login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readData(usersFilePath);
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.username = decoded.username;
        next();
    });
};

// Announcements API
app.get('/api/announcements', (req, res) => {
    const announcements = readData(announcementsFilePath);
    res.json(announcements);
});

app.post('/api/announcements', verifyToken, (req, res) => {
    const announcements = readData(announcementsFilePath);
    const newAnnouncement = { id: Date.now(), ...req.body };
    announcements.push(newAnnouncement);
    writeData(announcementsFilePath, announcements);
    res.status(201).json(newAnnouncement);
});

app.put('/api/announcements/:id', verifyToken, (req, res) => {
    const announcements = readData(announcementsFilePath);
    const index = announcements.findIndex(a => a.id == req.params.id);
    if (index !== -1) {
        announcements[index] = { ...announcements[index], ...req.body };
        writeData(announcementsFilePath, announcements);
        res.json(announcements[index]);
    } else {
        res.status(404).json({ message: 'Announcement not found' });
    }
});

app.delete('/api/announcements/:id', verifyToken, (req, res) => {
    let announcements = readData(announcementsFilePath);
    announcements = announcements.filter(a => a.id != req.params.id);
    writeData(announcementsFilePath, announcements);
    res.status(204).send();
});

// Events API
app.get('/api/events', (req, res) => {
    const events = readData(eventsFilePath);
    res.json(events);
});

app.post('/api/events', verifyToken, (req, res) => {
    const events = readData(eventsFilePath);
    const newEvent = { id: Date.now(), ...req.body };
    events.push(newEvent);
    writeData(eventsFilePath, events);
    res.status(201).json(newEvent);
});

app.put('/api/events/:id', verifyToken, (req, res) => {
    const events = readData(eventsFilePath);
    const index = events.findIndex(e => e.id == req.params.id);
    if (index !== -1) {
        events[index] = { ...events[index], ...req.body };
        writeData(eventsFilePath, events);
        res.json(events[index]);
    } else {
        res.status(404).json({ message: 'Event not found' });
    }
});

app.delete('/api/events/:id', verifyToken, (req, res) => {
    let events = readData(eventsFilePath);
    events = events.filter(e => e.id != req.params.id);
    writeData(eventsFilePath, events);
    res.status(204).send();
});

// Search and filter
app.get('/api/search', (req, res) => {
    const { query, type } = req.query;
    const announcements = readData(announcementsFilePath);
    const events = readData(eventsFilePath);
    let results = [];

    if (type === 'announcements' || !type) {
        results = results.concat(announcements.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.content.toLowerCase().includes(query.toLowerCase())));
    }
    if (type === 'events' || !type) {
        results = results.concat(events.filter(e => e.title.toLowerCase().includes(query.toLowerCase()) || e.description.toLowerCase().includes(query.toLowerCase())));
    }

    res.json(results);
});

// Timetable API
app.get('/api/timetable', (req, res) => {
    const timetable = readData(timetableFilePath);
    res.json(timetable);
});

app.put('/api/timetable', verifyToken, (req, res) => {
    writeData(timetableFilePath, req.body);
    res.json({ message: 'Timetable updated successfully' });
});

// Serve the main index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
