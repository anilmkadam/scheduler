const express = require('express');
const uuidv1 = require('uuid/v1');
const router = express.Router();

const {users, writeData } = require('../utility/dataAdapter');

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
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const securityQue = req.body.securityQue;
    const answer = req.body.answer;

    const user = {
        'name' : name,
        'email' : email,
        'password' : password,
        'securityQue' : securityQue,
        'answer' : answer
    }

    if(users.find((u) => u.email === user.email)) {
        res.json({
            success: false,
            message: "Already present"
        });
    } else {
        writeData(user);
        res.json({
            success: true,
            message: 'user added successfully',
            user: users.find((u) => u.email === user.email)
        })
    }
});

router.get('/users', (req, res) => {
    res.json({
        users: users
    })
})
module.exports = router;