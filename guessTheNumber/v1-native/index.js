const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

let randomNum = parseInt(Math.random() * 100);
let guessCount = 0;
console.log('randomNum', randomNum);
http.createServer(function (req, res) {
    const { pathname, query } = url.parse(req.url);
    if (pathname === '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    }
    if (pathname === '/favicon.ico') {
        res.end();
        return
    }
    if (pathname === '/guess') {
        const guessNumber = Number(querystring.parse(query).guessNumber || -1);
        if (guessNumber !== -1) {
            guessCount++;
            if (randomNum === guessNumber) {
                res.end(`yes,猜了${guessCount}遍,数字已经重置！`);
                randomNum = parseInt(Math.random() * 100);
                guessCount = 0;
                console.log('randomNum', randomNum);
            }
            if (randomNum >= guessNumber) {
                res.end('too small');
            }
            if (randomNum <= guessNumber) {
                res.end('too big');
            }
        }
    }
}).listen(3000);
console.log('server running !');