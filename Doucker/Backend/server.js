import express from 'express';
const app = express ();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
});

app.get('/api/data', (req, res) => {
    res.status(200).json({data: 'This is some data from the server.'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});