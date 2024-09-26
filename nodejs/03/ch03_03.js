const fs = require('fs');

// fs.readFile('/etc/hosts', 'utf8', (err, data) => {
//     if (err) {
//         console.log('err', err);
//     }
//     console.log(data);
// });

const data = fs.readFileSync('hello.txt', 'utf-8');
console.log(data);