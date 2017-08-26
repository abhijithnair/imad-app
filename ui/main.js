

var button = document.getElementById('counter');



button.onclick = function(){
    //create a request object
    var request =new XMLHttpRequest();
    //Capture the response and store it in variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take some action.
            if(request.status === 100){
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
            }
        }
        //not done yet
    };
    
    // make a request object
  
  request.open('GET','http://abhijitnair6.imad.hasura-app.io/counter',true);
   request.send(null);
};


//submit name

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = docment.getElementById('submit-btn');
submit.onclick = function() {
  //Make a request to the server and send the name
  
  // Capture a list of names and render it as a list
  var names = ['name1', 'name2', 'name3', 'name4'];
  var list = '';
  for (var i=0; i< names.length; i++){
     list += '<li>' + names[i] + '</li>';
  }
  var ul = document.getElementById('namelist');
  ul.InnerHTML = list;
};
  