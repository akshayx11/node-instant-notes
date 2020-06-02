const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: false
}));
//const toRouters = require('./textOperations');
const toRouterPath = path.join(__dirname, '/textOperations');
app.use(express.static(toRouterPath));
app.use('/', toRouterPath);
app.listen(process.env.port || 3000, (req, res) => {
    console.log("Server running!!");
});