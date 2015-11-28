/// html selectors
var context = $("#takeoffCanvas")[0].getContext("2d");
var $canvas = $("#takeoffCanvas");
var $window = $(window);
var $button = $(".button")
var length = 0;
var contLength = 0;
var xval = 0;
var yval = 0;
var area = 0;
var scale;
var verticalScale = 1;
var horizontalScale =  1;
var image = document.getElementById("source");
var imageWidth = image.width;
var imageHeight = image.height;
var zoomIn = $(".zoomIn");
var zoomOut = $(".zoomOut");
var zoomIncrement = .05;
var zoomInCount = 0;
var zoomOutCount = 0;

//zoomIn and zoomOut
zoomIn.off().on("click", function() {
  event.preventDefault();
  verticalScale += zoomIncrement * zoomOutCount;
  horizontalScale += zoomIncrement * zoomOutCount;
  zoomOutCount = 0;
  verticalScale += zoomIncrement;
  horizontalScale += zoomIncrement;
  context.clearRect(0, 0, image.width, image.height);
  callback(image);
  console.log(verticalScale);
  zoomInCount += 1;
});
zoomOut.off().on("click", function() {
  event.preventDefault();
  verticalScale -= zoomIncrement * zoomInCount;
  horizontalScale -= zoomIncrement * zoomInCount;
  zoomInCount = 0;
  verticalScale -= zoomIncrement;
  horizontalScale -= zoomIncrement;
  context.clearRect(0, 0, image.width, image.height);
  callback(image);
  console.log(verticalScale);
  zoomOutCount += 1;
});

//drawImage;
var callback = function(img) {
  if (!img) img = this;
  context.imageSmoothingEnabled = false;
  context.scale(verticalScale, horizontalScale)
  context.drawImage(image, 0,0);

}
if(image.complete){
  callback(image);
}
else {
  image.onload = callback;
}

/// selected button
$button.click(function() {
  event.preventDefault();
  $("li").removeClass("selected");
$(this).addClass("selected");
});

/// varibles for click cordinates
var x
var y
var x2
var y2
var user_cord = [];
// set width and height of canvas
var viewportHeight = imageHeight;
var viewportWidth = imageWidth;
$canvas.attr("height", viewportHeight);
$canvas.attr("width", viewportWidth);
var image = document.getElementById("source");

//notify to set scale
if (scale == null){
alert("You need to set scale. Click Scale button to callibrate");
};
$(".scale").click(function(){
alert("Please select two points with known distance");

});


// when browser is first open
//resizeCanvas();
//on window resize
//$window.resize(function() {
//resizeCanvas();

//});

// lengthTool
$canvas.click(function(e) {
if ($(".lengthTool").hasClass("selected")) {
  var parentOffset = $(this).offset();
   x = e.offsetX;
   y = e.offsetY;
var obj = {
  xcord: x,
  ycord: y
}// end of var obj
user_cord.push(obj);
context.beginPath();
if (user_cord.length > 1) {
context.moveTo(user_cord[0].xcord, user_cord[0].ycord);
context.lineTo(user_cord[1].xcord, user_cord[1].ycord);
context.stroke();
var xs = user_cord[1].xcord - user_cord[0].xcord;
 xs = xs * xs;
 var ys = user_cord[1].ycord - user_cord[0].ycord;
 ys = ys * ys;
 length += Math.sqrt(xs + ys)
console.log(length / scale);
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
  }// end of var obj
  user_cord.push(obj);
  if (user_cord.length === 1) {
  context.beginPath();
  context.moveTo(x, y);
  x2 = x;
  y2 = y;

} else {
  context.lineTo(x,y);
  context.stroke();
  var xs = x2 - x;
   xs = xs * xs;
   var ys = y2 - y;
   ys = ys * ys;

   contLength += Math.sqrt(xs + ys);
   console.log(contLength / scale);
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
  context.beginPath();
  context.moveTo(x, y);
  console.log(x, y);
  } else {
  context.lineTo(x,y);
  console.log(x, y);
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
context.stroke();
var xs = user_cord[1].xcord - user_cord[0].xcord;
 xs = xs * xs;
 var ys = user_cord[1].ycord - user_cord[0].ycord;
 ys = ys * ys;
 length += Math.sqrt(xs + ys)
 console.log(length)
var user_length = prompt("What is the length of that line?")
user_length = parseInt(user_length);
scale = length / user_length
console.log("user_length:" + user_length);
console.log("length" + length);
console.log(scale);
length = 0;
user_cord = [];
}
}
});//end of clcik function MAIN
$($canvas).dblclick(function() {
  if($(".contLength").hasClass("selected")) {
event.preventDefault();
  console.log(contLength);
  contLength = 0;
  user_cord = [];
} else if ($(".areaTool").hasClass("selected")) {
  event.preventDefault();
  context.closePath();
  context.stroke();
  context.fillstyle = "red";
  context.fill();
var finalcnx = user_cord[0];
user_cord.push(finalcnx);
for (i=1; i < user_cord.length; i++) {
  y = i - 1;
xval += (user_cord[y].xcord / scale) * (user_cord[i].ycord / scale);
yval += (user_cord[i].xcord /scale) * (user_cord[y].ycord / scale);
area = xval - yval;
};
area = area / 2;
console.log(area);
xval = 0;
yval = 0;
area = 0;
user_cord = [];
}
});
