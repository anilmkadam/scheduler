const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Hello Folks...."
    });
})
app.listen(3000, () => {
    console.log('Server started.');
    console.log('listening on 3000 port.....'); 
});