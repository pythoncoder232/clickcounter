const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

let count = 0;

// Load the count from a file if it exists
if (fs.existsSync('count.json')) {
    const data = fs.readFileSync('count.json');
    count = JSON.parse(data).count;
    console.log(`Loaded count: ${count}`);
}

// Middleware to parse JSON bodies
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API to get the current count
app.get('/count', (req, res) => {
    console.log('GET /count');
    res.json({ count });
});

// API to increment the count
app.post('/increment', (req, res) => {
    console.log('POST /increment');
    count++;
    fs.writeFileSync('count.json', JSON.stringify({ count }));
    res.json({ count });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});