let express = require('express');
let scrapper = require('webscrapper');
let path = require('path');
let app = express();

app.use(express.static('public'));

app.get('/', function (req, res, next) {
    res.sendFile('index.html');
});
app.all('/analys/*', function (req, res, next) {
    scrapper.scrapper(req.params['0'], (err, response)=> {
        if(err){
            res.send({'err': err});
            return;
        }
        res.send({'data': response});
    });
});

app.listen(3000, 'localhost', function() {
    console.log('server is running');
});