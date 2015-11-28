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
var imageObj = new Image();
imageObj.src = 'img/plans-0.png';
var viewportWidth = $window.width;
var viewportHeight = $window.height;
///draw image on canvas

      var imageObj = new Image();
      imageObj.src = 'img/plans-0.png';

      imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0);
      };



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
function resizeCanvas() {

$canvas.attr("width", viewportHeight);
$canvas.attr("height", viewportWidth);
}
// when browser is first open
resizeCanvas();
//on window resize
$window.resize(function() {
resizeCanvas();

});

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
console.log(length);
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


}///end of area tool;
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

for (i=1; i < user_cord.length; i++) {
  y = i - 1;
xval += user_cord[y].xcord * user_cord[i].ycord;
yval += user_cord[i].xcord * user_cord[y].ycord;
}
console.log(xval);
console.log(yval);
area = (xval - yval) / 2
console.log(area)
xval = 0;
yval = 0;
area = 0;
user_cord = [];
}
});
