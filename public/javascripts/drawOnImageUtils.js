/*
depencencies (put this before you include this file in html):
    twojs, jquery

draw on images
 */
$(document).ready(function () {

});

/*
build something we can draw on
keep backgroundImgPath in single quotes

this assumes a SINGLE svg exists on the page.

todo: have some selector for multiple SVGs

returns: two instance used for drawing..
 */
function buildDrawingInstance(backgroundImgPath,targetId, w, h){
    var targetEle = document.getElementById(targetId);
    var options = {width:w, height:h};
    //two's the library's driver object
    var two = new Two(options).appendTo(targetEle);
    var bg = `<image xlink:href=${backgroundImgPath} x='0' y='0' height='${h}px' width='${w}px'></image>;`

    document.querySelector("svg").innerHTML += bg;
    two.update();
    return two;
}

function drawCircle(two, x, y, rad){
    var circle = two.makeCircle(x,y,rad);
    circle.fill = '#FF8000';
}