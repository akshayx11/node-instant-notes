const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: false
}));
const toRouters = require('./textOperations');
app.use('/', toRouters);
app.get('/test', (req, res) => {
    res.send({
        test: "Test Successful"
    });
});
app.listen(process.env.port || 3000, (req, res) => {
    console.log("Server running!!");
});