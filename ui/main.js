console.log('loaded!');
//Change the text of the main-text div
var element = document.getElementById('main-text');

element.innerHTML = "Hi! My name is Abhijith Nair";



var button = document.getElementById('counter');
var counter = 0;


button.onclick = function(){
    //makke a requst to the counter endpoint
    
    //Capture the response and store it in variable
    
    
    // render the variable in correct span
    counter = counter +1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};
