const fs = require('fs');
const express = require('express');

const router = express.Router();
const now = Date.now();
router.get('/', (req, res, next) => {
    fs.readFile('./usersData/userData.json', '', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data);
        res.send(jsonData);
    });
});
router.post('/', (req, res, next) => {
    try {
        const {
            content
        } = req.body;
        if (content === "") {
            return res.status(400).send({
                error: "No content Adeed"
            });
        }
        const formattedContent = {
            content: `<pre>${content}</pre>`,
            addedDate: now
        }
        fs.readFile('./usersData/userData.json', '', (err, data) => {
            if (err) throw err;
            const jsonData = JSON.parse(data);
            jsonData[`${now}`] = formattedContent;
            fs.writeFile('./usersData/userData.json', JSON.stringify(jsonData), (errr, data) => {
                if (err) throw err;
                res.status(200).send(formattedContent);
            })
        });
    } catch (e) {
        next(e);
    }
});

router.put("/:textId", (req, res, next) => {
    try {
        const {
            textId
        } = req.params;
        const {
            content
        } = req.body;
        const formattedContent = {
            content,
            updatedDate: now
        }
        fs.readFile("./usersData/userData.json", '', (err, data) => {
            if (err) throw err;
            const jsonData = JSON.parse(data);
            const {
                addedDate = now
            } = jsonData[`${textId}`] || {};
            jsonData[`${textId}`] = {
                addedDate,
                ...formattedContent
            };
            fs.writeFile("./usersData/userData.json", JSON.stringify(jsonData), (err, data) => {
                if (err) throw err;
                res.send(formattedContent);
            });
        });
    } catch (e) {
        next(e);
    }
});

router.delete("/:textId", (req, res, next) => {
    try {
        const {
            textId
        } = req.params;
        fs.readFile("./usersData/userData.json", '', (err, data) => {
            if (err) throw err;
            const jsonData = JSON.parse(data);
            delete jsonData[`${textId}`];
            fs.writeFile("./usersData/userData.json", JSON.stringify(jsonData), (err, data) => {
                if (err) throw err;
                res.status(200).send(jsonData);
            });
        });
    } catch (e) {
        next(e);
    }

});

module.exports = router;