const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const uuidv1 = require('uuid/v1');

const {writeData, users} = require('./utility/dataAdapter');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Hello Folks...."
    });
});

app.post('/login', (req, res) => {
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
})

app.post('/signup',(req, res) => {
    
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
app.listen(3000, () => {
    console.log('Server started.');
    console.log('listening on 3000 port.....'); 
});