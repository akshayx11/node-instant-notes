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
router.get('/', (req, res, next) => {
    res.send({
        meg: "Hello World"
    });
    /* fs.readFile('./usersData/userData.json', '', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        res.send(jsonData);
    }); */
});
app.use('/', toRouters);

app.listen(process.env.port || 3000, (req, res) => {
    console.log("Server running!!");
});