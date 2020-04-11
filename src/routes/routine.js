const express = require('express');
const router = express.Router();

const {conn} = require('../utility/dataAdapter');

router.get('/getpairs', (req, res) => {
    conn.query('SELECT * from pairs', (error, results) => {
        if(error)
            throw error
        res.status(200).json(results.rows);
    })
})

router.post('/createpair', (req, res) => {
    const {email1, email2 } = req.body;

    conn.query('INSERT INTO pairs(email1, email2) VALUES ($1, $2)', [email1, email2], (error, results) => {
        if(error) {
            res.status(500).json(error);
            throw error;
        }
        res.status(200).json("pair created");
    });
});

module.exports = router;