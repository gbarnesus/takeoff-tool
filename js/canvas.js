//add when finsished for firefox $(window).bind("load", function() {
/// html selectors
var context = $("#takeoffCanvas")[0].getContext("2d");
var $canvas = $("#takeoffCanvas");
var $window = $(window);
var $button = $(".button");
/// length for length tool
var length = 0;
var lengthHTML = "";
// length for Cont. Length Tool
var contLength = 0;
//// total for area Tool
var area = 0;
// variable for calculating area
var xval = 0;
var yval = 0;
/// initial scale for canvas
var scale = .2;
var isScaleSet = false;
//// revoling scale
var verticalScale = .2;
var horizontalScale =  .2;
/// image to display on canvas
var images = $(".img");
var imageNum = 0;
var image = images[imageNum];
var imageWidth = image.width;
var imageHeight = image.height;
// next and prevpage selectors
var nextPage = $(".nextPage");
var prevPage = $(".prevPage");
/// zoom in and out selectors
var zoomIn = $(".zoomIn");
var zoomOut = $(".zoomOut");
/// increment for each zoom click
var zoomIncrement = 0.1;
/// zoom in counter
var zoomInCount = 0;
var zoomOutCount = 0;
/// where the scale is vs initial scale value
var undoScale = 5;
var redoScale = .2;
/// to see if context scale need to be reset or not
var didundoscalerun = false;
/// varibles for click cordinates
var x;
var y;
var x2;
var y2;
var user_cord = [];
// variables for line color
var colorForm = $(".colors");
var color = $('input[name="color"]:checked').val();
//variables for table
var dataTable = $(".dataTable");
var areaTotals = $(".areaTotals");
var lengthTotals = $(".lengthTotals");
var lengthTotalsTH =$(".lengthTotalsTH");
var contLengthTotals = $(".contLengthTotals");
var totalsTable = $(".totalsTable");
var lengthCounter = 1;
var areaTotalsTH = $(".areaTotalsTH");
var areaCounter = 1;
var areaHTML = "";
var contLengthTH = $('.contLengthTH');
var contLengthCounter = 1;
var contLengthHTML = "";

//when button is click display or hide
totalsTable.off().on("click", function() {
  if (dataTable.css("display") == 'none') {
    dataTable.show();

  } else {
    dataTable.hide();
  };
});
//drawImage on scale;
//functions

var callback = function(img) {
  if (!img) img = this;
  context.scale(verticalScale, horizontalScale)
  context.drawImage(image, 0,0);
}
if(image.complete){
  callback(image);
}
else {
  image.onload = callback;
}
// set canvas width and height
var setCanvasSize = function(){
  $canvas.attr("height", imageHeight);
  $canvas.attr("width", imageWidth);

}
setCanvasSize();
// erase and draw image at new scale
var redrawImage = function(){
  ///erase canvas
  context.clearRect(0, 0, image.width, image.height);
  //redeaw image on canvas
  callback(image);
  //adjust tool scale to new image scale
  scale = scale * verticalScale;
  //set values to adjust drawing tools so they dont draw at scaled value
  undoScale = undoScale / verticalScale;
  redoScale = redoScale * verticalScale;
}
var drawNewImage = function(img){
  image = images[imageNum];
  isScaleSet = false;
    if (!img) img = this;
    context.drawImage(image, 0,0);
  }
  if(image.complete){
    callback(image);
  }
  else {
    image.onload = callback;
  };
var disablePageButton = function(){
  if (imageNum == 0){
  prevPage.hide();
} else if (imageNum + 1 ==  images.length){
  nextPage.hide();
} else {
  prevPage.show();
  nextPage.show();
}
};
disablePageButton();
// set context scale to correct value to keep tool and imagescale allignes
var resetIamgeScale = function() {
  if (didundoscalerun == true) {
 context.scale(redoScale, redoScale);
 didundoscalerun = false;
  }

}
//set scale back to 1
var resetScaleValues = function() {
  verticalScale = 1;
  horizontalScale = 1;

};
var scaleSet = function() {
  //notify to set scale
  if (isScaleSet == false){
  alert("You need to set scale. Click Scale button to callibrate");
  };
  $(".scale").click(function(){
  alert("Please select two points with known distance");

  });
};
var setToolScale = function() {
  if (didundoscalerun == false) {
  context.scale(undoScale, undoScale);
  didundoscalerun = true;}
};
// set line color
colorForm.on("click", function(){
color = $('input[name="color"]:checked').val();
});
$("body").height(imageHeight);
nextPage.off().on("click", function(){

  imageNum += 1;
  drawNewImage();
  disablePageButton();
  return false;
});
prevPage.off().on("click", function(){
  imageNum -= 1;
  drawNewImage();
  disablePageButton();
  return false;
});
//zoomIn and zoomOut
zoomIn.off().on("click", function() {
  resetIamgeScale();
  resetScaleValues();
  ///zoom by one increment
  verticalScale += zoomIncrement;
  horizontalScale += zoomIncrement;
  redrawImage();
  return false;
;
});
zoomOut.off().on("click", function() {
  resetIamgeScale();
  resetScaleValues();
  //zoom by increment
  verticalScale -= zoomIncrement;
  horizontalScale -= zoomIncrement;
  redrawImage();
  return false;
});


/// selected button
$button.click(function() {
  $(".button").removeClass("selected");
$(this).addClass("selected");
if ($(this).hasClass("notTool")){

} else {
scaleSet();
};
if($(".contLength").hasClass("selected")) {
contLength = 0;
user_cord = [];
};
return false;
});
// lengthTool
$canvas.click(function(e) {
if ($(".lengthTool").hasClass("selected")) {
  //offset cordinates from canvas instead of document
  var parentOffset = $(this).offset();
   x = e.offsetX;
   y = e.offsetY;
   //create object from click cordinetes
var obj = {
  xcord: x,
  ycord: y
}// end of var obj
user_cord.push(obj);
setToolScale();
context.beginPath();

//second Click
if (user_cord.length > 1) {
context.moveTo(user_cord[0].xcord, user_cord[0].ycord);
context.lineTo(user_cord[1].xcord, user_cord[1].ycord);
context.strokeStyle = color;
context.stroke();
var xs = user_cord[1].xcord - user_cord[0].xcord;
 xs = xs * xs;
 var ys = user_cord[1].ycord - user_cord[0].ycord;
 ys = ys * ys;
 length += Math.sqrt(xs + ys);
 length = length / scale;
 length = Math.round(length);
 lengthHTML = "<tr><td>" + length + "</td></tr>";
 lengthTotals.after(lengthHTML);
 lengthCounter += 1;
 lengthTotalsTH.attr("rowspan", lengthCounter);

length = 0;
 user_cord = [];
}; //end of if statement to print line and add length
}/* end of lengthTool*/ else if ($(".contLength").hasClass("selected")) {

  var parentOffset = $(this).offset();
   x = e.offsetX;
   y = e.offsetY;
  var obj = {
  xcord: x,
  ycord: y
  }
  // end of var obj
  user_cord.push(obj);
  if (user_cord.length == 1) {
    setToolScale();
  context.beginPath();
  context.moveTo(x, y);
  x2 = x;
  y2 = y;
} else {
  context.lineTo(x,y);
  context.strokeStyle = color;
  context.stroke();
  var xs = x2 - x;
   xs = xs * xs;
   var ys = y2 - y;
   ys = ys * ys;
   contLength += Math.sqrt(xs + ys);

   x2 = x;
   y2 = y;
   };

} else if ($(".areaTool").hasClass("selected")) {
  var parentOffset = $(this).offset();
   x = e.offsetX;
   y = e.offsetY;
  var obj = {
  xcord: x,
  ycord: y
  }// end of var obj
  user_cord.push(obj);
  if (user_cord.length === 1) {
  setToolScale();
  context.beginPath();
  context.moveTo(x, y);
  } else {
  context.lineTo(x,y);
  context.strokeStyle = color;
  context.stroke();
   };
}
if ($(".scale").hasClass("selected")) {
  var parentOffset = $(this).offset();
   x = e.offsetX;
   y = e.offsetY;
var obj = {
  xcord: x,
  ycord: y
}// end of var obj
user_cord.push(obj);
context.beginPath();
if (user_cord.length == 2) {
context.moveTo(user_cord[0].xcord, user_cord[0].ycord);
context.lineTo(user_cord[1].xcord, user_cord[1].ycord);
context.strokeStyle = color;
context.stroke();
var xs = user_cord[1].xcord - user_cord[0].xcord;
 xs = xs * xs;
 var ys = user_cord[1].ycord - user_cord[0].ycord;
 ys = ys * ys;
 length += Math.sqrt(xs + ys)
var user_length = prompt("What is the length of that line?")
user_length = parseInt(user_length);
scale = length / user_length;
isScaleSet = true;
length = 0;
user_cord = [];
}
}
return false;
});//end of clcik function MAIN
/********************************
**********************************
Start Double Click to end area and contuios length tool
*********************************/

$($canvas).dblclick (function() {
  if($(".contLength").hasClass("selected")) {
event.preventDefault();
contLength = Math.round(contLength / scale);
contLengthHTML = "<tr><td>" + contLength + "</td></tr>";
contLengthTotals.after(contLengthHTML);
contLengthCounter += 1;
contLengthTH.attr("rowspan", contLengthCounter);
  contLength = 0;
  user_cord = [];
} else if ($(".areaTool").hasClass("selected")) {
  event.preventDefault();
  context.closePath();
  context.strokeStyle = color;
  context.stroke();
  context.globalAlpha = 0.2;
  context.fillStyle = color;
  context.fill();
  context.globalAlpha = 1;
var finalcnx = user_cord[0];
user_cord.push(finalcnx);
for (i=1; i < user_cord.length; i++) {
  y = i - 1;
xval += (user_cord[y].xcord / scale) * (user_cord[i].ycord / scale);
yval += (user_cord[i].xcord /scale) * (user_cord[y].ycord / scale);
area = xval - yval;
};
area = area / 2;
if (area < 0){
  area = area * -1;
}
area = Math.round(area);
areaHTML = "<tr><td>" + area + "</td></tr>";
areaTotals.after(areaHTML);
areaCounter += 1;
areaTotalsTH.attr("rowspan", areaCounter);
xval = 0;
yval = 0;
area = 0;
user_cord = [];
}
return false;
});
///});
