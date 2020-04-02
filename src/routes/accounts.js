const express = require('express');
const uuidv1 = require('uuid/v1');
const router = express.Router();

const {users, writeData,  conn} = require('../utility/dataAdapter');

router.post('/login', (req, res) => {
    const username = req.body.email;
    const password = req.body.password;

    if(users.find((u) => u.email === username && u.password === password)){
        res.json({
            success: true,
            message: 'logged in successfully',
            session_id: uuidv1()
        });
    } else {
        res.json({
            success: false,
            message: 'Invalid username or password',
        })
    }
});

router.post('/signup',(req, res) => {
    
    const {name, email, password, securityQue, answer} = req.body;
    console.log("data " + name, email, password, securityQue, answer);
    let isAuthentic = false
    
    conn.query('INSERT INTO users(email, name, security_que, security_ans, password, isauthentic) VALUES($1, $2, $3, $4, $5, $6)',[email, name, securityQue, answer, password, isAuthentic], (error, results) => {
        if(error) {
            res.status(500).json(error)
            throw error;
        } 
        res.status(200).send(`User added with ID : ${results.insertId}`);
    });
});

router.get('/users', (req, res) => {
    conn.query('SELECT * FROM users',(error, results) => {
        if(error)
            throw error
        res.status(200).json(results.rows);
    });
});

module.exports = router;