var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
    user: 'abhijitnair6',
    database: 'abhijitnair6',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};
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

function hash(input, salt){
   var hashed = crypto.pbkdf2Sync(input, salt,10000, 512,'sha512');
   return ["pbkdf2","10000", salt, hashed.toString('hex')].join("$");
}

app.get('/hash/:input',function(req, res){
   var hashedString = hash(req.params.input,'This is some Random String') ;
  res.send(hashedString);
});

app.post('/create-user',function(req, res){
   // username,password
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.getRandomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "users"(username,password)VALUES($1, $2)',[username, dbString],function(err,result){
       if(err){
            res.status(500).server(err.toString());
                }else
                {
                    res.send('User Successfully created:'+ username);
                }
   });
});

var pool= new Pool(config);
app.get('/test-db',function(req, res){
    //Select a request and make a response
    //return a response
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).server(err.toString());
                }else
                {
                    res.send(JSON.stringify(result.rows));
                }
    });
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

app.get('/pages/:pageName',function(req, res){
    // pageName == pageOne
    // pages[pageName] == {} content object for pageOne
    
    pool.query("SELECT * FROM page WHERE title =$1", [req.params.pageName],function(err,result){
  if(err){
      res.status(500).send(err.toString());
  }else {
         if(result.rows.length === 0){
             res.status(404).send('Page1 was not found');
         }else {
             var pageData = result.rows[0];
             res.send(createTemplate(pageData));
         }
  }
 }); 	
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
