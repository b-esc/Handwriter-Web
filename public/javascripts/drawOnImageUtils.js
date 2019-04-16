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
/* swals (sweetalerts) are popup boxes
 * they can be modified once a letter has been selected from "View Data"
 * current swals:
 * LetterCodes (selector, should appear by default)
 * LoopCount, Line Number, Centroid H/V Location (sliders)
 * Double value sliders would be cool
 *
 * see sweetalert2 documentation
 */
var swals = {}

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

/*
 * Called from showletter's inputValidator
 * TODO: performance improvements via mutation
 * Recreating swals everytime for now to expidite development
 */
function compareLetter(letterid){
    /*LOL R to regular programming languages
    R is one indexed, so we take the end of the letterid
    and decrement it by one*/
    var targLetter = letterid.substr(-1);
    targLetter--; //this is now a # that indexes our gLetterData
    //LetterCodes, characters already initialized

    // Create Letter Code Comparison Swal
    var letterCodeSwal = {
        title: 'Letter Code Comparison',
        input: 'select',
        inputOptions:{},
        inputPlaceholder: 'Choose a Letter Code'
        inputValidator: (value) =>{
            console.log(value);
        }
    }
    var availableLetterCodes = letterCodeNums.keys();
    for(var i = 0; i < availableLetterCodes.length; i++){
        var cur = availableLetterCodes[i];
        letterCodeSwal.inputOptions.cur = cur;
    }
    swals.letterCodeSwal = letterCodeSwal;
}
