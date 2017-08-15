console.Log('loaded!');
//Change the text of the main-text div
var element = document.getElementById('main-text');

element.innerHTML = "This is JavaScript";

//Move the image

var img = document.getElementById('dina');
var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 10;
 img.style.marginLeft = marginLeft + 'px';
}


img.onclick = function() {
   
     var interval = setinterval(moveRight,100);
   
    
};