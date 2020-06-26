const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', function (req, res) {
    res.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
})

let randomNum = parseInt(Math.random() * 100);
let guessCount = 0;
console.log('randomNum', randomNum);
app.get('/guess', function (req, res, next) {
    const { query } = req;
    const guessNumber = Number(query.guessNumber || -1);
    if (guessNumber !== -1) {
        guessCount++;
        if (randomNum === guessNumber) {
            res.send(`yes,猜了${guessCount}遍,数字已经重置！`);
            randomNum = parseInt(Math.random() * 100);
            guessCount = 0;
            console.log('randomNum', randomNum);
        }
        if (randomNum >= guessNumber) {
            res.send('too small');
        }
        if (randomNum <= guessNumber) {
            res.send('too big');
        }
    }
})
app.get(
    '/middleware',
    function (req, res, next) {
        res.level = 1;
        next();
        res.send(`第${res.level}层！`)
    },
    function (req, res) {
        res.level = 2;
    }
)



app.use(function (req, res) {
    res.send('hello node');
})
app.listen(3000);
console.log('server running !');
