const express = require('express');
const uuidv1 = require('uuid/v1');
const router = express.Router();

const {users, conn} = require('../utility/dataAdapter');

router.post('/login', (req, res) => {
    const {email, password} = req.body

    conn.query("SELECT * FROM users where email = $1 AND password = $2", [email, password], (error, results) => {
        if(error) {
            throw error;
        }
        if(results.rowCount > 0){
            res.status(200).json({
                success: true,
                message: 'logged in successfully',
                session_id: uuidv1(),
                user: results.rows[0]
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Invalid username or password',
            });
        }

    })
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