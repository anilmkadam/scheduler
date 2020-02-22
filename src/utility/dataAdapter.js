const fs = require('fs');
const path = require('path');

const usersData = fs.readFileSync('src/utility/json/accounts.json', {encoding: 'utf8'});
const users = JSON.parse(usersData).users;

writeData = (user) => {
    users.push(user);
    const userData = JSON.stringify({users}, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), userData, 'utf8');
}

module.exports = {
    users,
    writeData
}