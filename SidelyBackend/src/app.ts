import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, 'db.json');

app.use(bodyParser.json());

// /ping endpoint
app.get('/ping', (req, res) => {
    res.json(true);
});

// /submit endpoint
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newEntry = { name, email, phone, github_link, stopwatch_time };

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database');
            return;
        }

        const submissions = JSON.parse(data);
        submissions.push(newEntry);

        fs.writeFile(dbPath, JSON.stringify(submissions, null, 2), 'utf8', err => {
            if (err) {
                res.status(500).send('Error writing to database');
                return;
            }

            res.status(201).send('Submission saved');
        });
    });
});

// /read endpoint
app.get('/read', (req, res) => {
    const { index } = req.query;

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database');
            return;
        }

        const submissions = JSON.parse(data);
        const idx = parseInt(index as string, 10);

        if (isNaN(idx) || idx < 0 || idx >= submissions.length) {
            res.status(400).send('Invalid index');
            return;
        }

        res.json(submissions[idx]);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
