console.log('loaded!');
//Change the text of the main-text div
var element = document.getElementById('main-text');

element.innerHTML = "Hi! My name is Abhijith Nair";

//Move the image

var img = document.getElementById('dina');
var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 10;
 img.style.marginLeft = marginLeft + 'px';
}


img.onclick = function() {
        var interval = setInterval(moveRight, 50);
  
};