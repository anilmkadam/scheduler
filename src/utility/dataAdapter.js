const fs = require('fs');
const path = require('path');
const pool = require('pg').Pool;

const usersData = fs.readFileSync('src/utility/json/accounts.json', {encoding: 'utf8'});
const users = JSON.parse(usersData).users;

writeData = (user) => {
    users.push(user);
    const userData = JSON.stringify({users}, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), userData, 'utf8');
}

const conn = new pool({
    user: 'postgres',
    host: 'localhost',
    database: 'scheduler',
    password: 'postgres',
    port: 5432
});

module.exports = {
    users,
    writeData,
    conn
}