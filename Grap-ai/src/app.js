const express = require('express');
const app = express();


app.use(cors());
app.use(bodyParser.json());

// Define your routes here
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
