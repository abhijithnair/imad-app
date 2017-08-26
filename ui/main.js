console.log('loaded!');
//Change the text of the main-text div
var element = document.getElementById('main-text');

element.innerHTML = "Hi! My name is Abhijith Nair";



var button = document.getElementById('counter');
var counter = 0;


button.onclick = function(){
    //create a request object
    var request =new XMLHttpRequest();
    //Capture the response and store it in variable
    request.onreadystatechange = function(){
        if(request.onreadystatechange == XMLHttpRequest.DONE){
            //Take some action.
            if(request.status==100){
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
            }
        }
        //not done yet
    };
    
    // make a request object
   // counter = counter +1;
  request.open('GET','http://abhijitnair6.imad.hasura-app.io/counter',true);
   request.send(null) ;
};
