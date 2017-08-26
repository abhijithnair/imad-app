var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles = {
    page1 : {
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
    </div>
    `
},
    page2 : {title : 'Page2|Personal Info',
    heading : 'Page2',
    date : 'August 10',
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
    </div>
    `},
    page3 : {
        title : 'Page3|Contact',
    heading : 'Page3',
    date : 'August 12',
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
    </div>
   `
   },
   
    };

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    

var htmlTemplate = `
    <html>
    <head>
        <title>${title}</title>
          <link href="/ui/style.css" rel="stylesheet" />
          <meta name= "viewport" content = "width-device-width"  initial-scale= "1"> 
    </head>
  <body>
     <div class=container>
         <a href="/">Home</a>
         <a href="page1">Page1</a>
         <a href="page2">Page2</a>
         <a href="page3">Page3</a>
     </div>
    
    <hr/>
   <div class = container>
    <h3>
       ${heading}
    </h3>
    <div>
        ${date}
    </div>
    
    ${content}
</div>
  </body>
      
        
  
</html>
    `;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var counter = 0;
app.get('/counter',function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req, res){  //URL: /Submit-name?name=xxx
    // Get the name from the request
    var name = req.query.name;
    names.push(name);
    // JSON: Javascript Object notation
    res.send(JSON.stringify(names));
});

app.get('/:pageName',function(req, res){
    // pageName == pageOne
    // pages[pageName] == {} content object for pageOne
    var pageName = req.params.pageName;
  	res.send(createTemplate(articles[pageName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js',function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.get('/page',function(req, res){
	res.send('That how simple respond takes place.');
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
