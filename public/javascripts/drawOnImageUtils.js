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
var letterCodeNums = {};

function buildDrawingInstance(letterData, backgroundImgPath,targetId, w, h, wo, ho){
    gLetterData = letterData;
    for(var i = 0; i < letterData.length; i++){
      if(letterCodeNums[letterData[i].letterCode] == null){
        letterCodeNums[letterData[i].letterCode] = [];
      } 
        letterCodeNums[letterData[i].letterCode].push(i);
    }
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
    console.log(letterCodeNums);
    return two;
}

function drawCircle(two, x, y, rad){
    var circle = two.makeCircle(x*widthMod,y*heightMod,rad);
    circle.fill = '#FF8000';
}

function drawLetterCentroids(two, num, rad){
    for(var i = 0; i < num.length; i++){
        var curLetter = gLetterData[num[i]];
        console.log(curLetter);
        drawCircle(two,curLetter.centroid_x*widthMod,curLetter.centroid_y*heightMod,rad);
    }
}

function drawLetterPaths(two,num,rad){
    console.log("about to call two makepath");
    for(var i = 0; i < num.length; i++){
        console.log("about to call two makepath");
        var curLetter = gLetterData[num[i]];
        var path = [];
        for(var j = 0; i < curLetter.pathX.length; j++){
            path.push(curLetter.pathX[j]);
            path.push(curLetter.pathY[j]);
        }
        console.log("about to call two makepath");
        two.makePath(1,1,2,2,3,3,true);
    }
}

function drawLetterCirclePath(two,num,rad){
    for(var i = 0; i < num.length; i++){
        var curLetter = gLetterData[num[i]];
        for(var j = 0; j < curLetter.pathX.length; j++){
            drawCircle(two,curLetter.centroid_x*widthMod,curLetter.centroid_y*heightMod,rad);
        }
    }
}
function letterCodesToNumbers(letterCodeArr){
  res = [];
  for(var i = 0; i < letterCodeArr.length; i++){
    res.push(letterCodeNums[letterCodeArr])
  }
  console.log(res);
  return res;
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
