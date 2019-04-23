/*
depencencies (put this before you include this file in html):
    twojs, jquery

draw on images
 */
$(document).ready(function() {});

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
var horizCentroidLoc = {};
var vertCentroidLoc = {};
var currentLetter;
var globaldraw;
/* swals (sweetalerts) are popup boxes
 * they can be modified once a letter has been selected from "View Data"
 * current swals:
 * LetterCodes (selector, should appear by default)
 * LoopCount, Line Number, Centroid H/V Location (sliders)
 * Double value sliders would be cool
 *
 * see sweetalert2 documentation
 */
var swals = {};

function buildDrawingInstance(
  letterData,
  backgroundImgPath,
  targetId,
  w,
  h,
  wo,
  ho
) {
  gLetterData = letterData;
  for (var i = 0; i < letterData.length; i++) {
    if (letterCodeNums[letterData[i].letterCode] == null) {
      letterCodeNums[letterData[i].letterCode] = [];
    }
    letterCodeNums[letterData[i].letterCode].push(i);

    horizCentroidLoc[i] = letterData[i].centroid_horiz_location[0];
    vertCentroidLoc[i] = letterData[i].centroid_vert_location[0];
  }
  widthMod = wo;
  heightMod = ho;
  var targetEle = document.getElementById(targetId);
  var options = { width: w, height: h };
  //two's the library's driver object
  var two = new Two(options).appendTo(targetEle);
  var bg = `<image xlink:href=${backgroundImgPath} x='0' y='0' height='${h}px' width='${w}px'></image>;`;

  document.querySelector("svg").innerHTML += bg;
  console.log(gLetterData);
  two.update();
  console.log(letterCodeNums);
  console.log(horizCentroidLoc);
  console.log(vertCentroidLoc);
  globaldraw = two;
  return two;
}

function drawCircle(two, x, y, rad) {
  var circle = two.makeCircle(x * widthMod, y * heightMod, rad);
  circle.fill = "#FF8000";
}

function drawLetterCentroids(two, num, rad) {
  for (var i = 0; i < num.length; i++) {
    var curLetter = gLetterData[num[i]];
    console.log(curLetter);
    drawCircle(
      two,
      curLetter.centroid_x * widthMod,
      curLetter.centroid_y * heightMod,
      rad
    );
  }
}

function drawLetterPaths(two, num, rad) {
  console.log("about to call two makepath");
  for (var i = 0; i < num.length; i++) {
    console.log("about to call two makepath");
    var curLetter = gLetterData[num[i]];
    var path = [];
    for (var j = 0; i < curLetter.pathX.length; j++) {
      path.push(curLetter.pathX[j]);
      path.push(curLetter.pathY[j]);
    }
    console.log("about to call two makepath");
    two.makePath(1, 1, 2, 2, 3, 3, true);
  }
}

function drawLetterCirclePath(two, num, rad) {
  for (var i = 0; i < num.length; i++) {
    var curLetter = gLetterData[num[i]];
    for (var j = 0; j < curLetter.pathX.length; j++) {
      drawCircle(
        two,
        curLetter.centroid_x * widthMod,
        curLetter.centroid_y * heightMod,
        rad
      );
    }
  }
}
function letterCodesToNumbers(letterCodeArr) {
  res = [];
  for (var i = 0; i < letterCodeArr.length; i++) {
    res.push(letterCodeNums[letterCodeArr]);
  }
  console.log(res);
  return res;
}

/*
 * Called from showletter's inputValidator
 *  TODO:
 *      Mutation instead of constant swal recreation
 *      Double sliders
 *
 */
function compareLetter(letterid) {
  var targLetter = letterid.substr(-1);
  targLetter--;
  //currentLetter is a global reference to the i-th letter we are on
  currentLetter = targLetter;
  //this is now a # that indexes our gLetterData
  //SWCP is a global regex identifier meaning SWAL COMPARE
  var curData = gLetterData[targLetter];
  // Create Letter Code Comparison Swal
  var compareLC_SWCP = {
    title: "Letter Code Comparison",
    input: "select",
    inputOptions: {},
    inputPlaceholder: "Choose a Letter Code",
    inputValidator: value => {
      console.log(value);
      var lcNum = letterCodesToNumbers(value);
      drawLetterCentroids(globaldraw, ...lcNum, 8);
      globaldraw.update();
    }
  };
  var availableLetterCodes = Object.keys(letterCodeNums);
  for (var i = 0; i < availableLetterCodes.length; i++) {
    var cur = availableLetterCodes[i];
    console.log(availableLetterCodes[i]);
    compareLC_SWCP.inputOptions[availableLetterCodes[i]] = cur;
    if (i == availableLetterCodes.length - 1) {
      swals.compareLC_SWCP = compareLC_SWCP;
      console.log(swals.compareLC_SWCP);
    }
  }

  //Create Centroid Horiz Location swals
  var compareHCL_SWCP = {
    title: "Centroid Horizontal Location",
    input: "range",
    inputAttributes: {
      min: 0,
      max: 1,
      step: 0.001
    },
    inputValue: curData.centroid_horiz_location,
    inputValidator: value => {
      var toDraw = gatherLettersWithinRange(
        curData.centroid_horiz_location,
        Math.abs(curData.centroid_horiz_location - value),
        horizCentroidLoc
      );
      drawLetterCentroids(globaldraw, ...toDraw, 8);
      globaldraw.update();
    }
  };
  swals.compareHCL_SWCP = compareHCL_SWCP;

  //Create Centroid Vert Location swals
  var compareVCL_SWCP = {
    title: "Centroid Vertical Location",
    input: "range",
    inputAttributes: {
      min: 0,
      max: 1,
      step: 0.001
    },
    inputValue: curData.centroid_vert_location,
    inputValidator: value => {
      var toDraw = gatherLettersWithinRange(
        curData.centroid_vert_location,
        Math.abs(curData.centroid_vert_location - value),
        vertCentroidLoc
      );
      drawLetterCentroids(globaldraw, ...toDraw, 8);
      globaldraw.update();
    }
  };
  swals.compareVCL_SWCP = compareVCL_SWCP;
}

function gatherLettersWithinRange(original, range, feature) {
  rt = [];
  console.log(feature);
  for (var i = 0; i < Object.keys(feature).length; i++) {
    console.log("og: " + original);
    console.log("feature: " + feature[i]);
    console.log("range: " + range);
    if (Math.abs(original - feature[i]) < range) {
      rt.push(i);
    }
  }
  return rt;
}
