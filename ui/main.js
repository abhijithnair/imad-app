console.log('Loaded!');
//Change the text of the main-text div
var element = document.getElementby('main-text');

element.innerHTML = "This is JavaScript";

//Move the image

var img = document.getElemntById('dina');


function moveRight() {
    marginLeft = marginLeft + 10;
 img.style.marginLeft = marginLeft + 'px';
}


img.onclick = function() {
   
     var interval = setinterval(moveRight,100);
   
    
};