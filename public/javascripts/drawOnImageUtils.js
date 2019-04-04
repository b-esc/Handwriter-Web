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
var widthMod = 1;
var heightMod = 1;
var gLetterData;

function buildDrawingInstance(letterData, backgroundImgPath,targetId, w, h, wo, ho){
    gLetterData = letterData;
    widthMod = wo;
    heightMod = ho;
    var targetEle = document.getElementById(targetId);
    var options = {width:w, height:h};
    //two's the library's driver object
    var two = new Two(options).appendTo(targetEle);
    var bg = `<image xlink:href=${backgroundImgPath} x='0' y='0' height='${h}px' width='${w}px'></image>;`

    document.querySelector("svg").innerHTML += bg;
    console.log(gLetterData);
    two.update();
    return two;
}

function drawCircle(two, x, y, rad){
    var circle = two.makeCircle(x*widthMod,y*heightMod,rad);
    circle.fill = '#FF8000';
}

function drawCentroid(two, num, rad){
    for(var i = 0; i < num.length; i++){
        var curLetter = gLetterData[num[i]];
        drawCircle(two,curLetter.centroid_x*widthMod,curLetter.centroid_y*heightMod,rad);
    }
}
// function alignMod(data){
//     if(data[height] > 800 && data[width] > 1100){
//
//     }
//     else if(data[height] > 800){
//
//     }
//     else if(data[width] > 1100){
//
//     }
// }