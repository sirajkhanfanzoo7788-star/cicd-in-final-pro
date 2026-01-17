const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, CI/CD World! Updated by Siraj');
});

module.exports = app;
