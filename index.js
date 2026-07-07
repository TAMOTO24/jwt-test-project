const express = require('express');
const app = express();
const port = 3000;
const env = require('dotenv');

env.config();
app.use(express.json());

app.listen(port, () => {
    console.log("server is listening on port " + port);
})
