const express = require('express');
const app = express();
const PORT = 8765;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(PORT, () => {
    console.log('Example Server running on ' + PORT);
});
