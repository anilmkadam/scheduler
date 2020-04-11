const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const accountsRoute = require('./routes/accounts');
const routineRoute = require('./routes/routine');
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

app.use(accountsRoute);
app.use(routineRoute);

app.listen(3000, () => {
    console.log('Server started.');
    console.log('listening on 3000 port.....'); 
});