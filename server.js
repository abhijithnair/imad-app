var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));



var page1 = {
    title : 'Page1|Info',
    heading : 'Page1',
    date : 'August 1',
    content : `<div>
        <p>
            This is my Page 1 First Paragraph.
        </p>
    </div>
    
    <div>
        <p>
            This is my Page 2  Second Paragraph.
        </p>
    </div>
    
    <div>
        <p>
            This is Page 3  my Third Paragraph.
        </p>
    </div>`,
}


var htmlTemplate = {
    
}










app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/page',function(req, res){
	res.send('That how simple respond takes place.');
});


app.get('/page1',function(req, res){
	res.sendFile(path.join(__dirname,'ui','page1.html'));
});

app.get('/page2',function(req, res){
	res.sendFile(path.join(__dirname,'ui','page2.html'));
});

app.get('/page3',function(req, res){
	res.sendFile(path.join(__dirname,'ui','page3.html'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
