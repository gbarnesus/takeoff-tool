var iframe = $("#iframe");
var viewportWidth = window.innerWidth - 50;
var viewportHeight = window.innerHeight - 50;

var windowResize = function () {
  viewportWidth = window.innerWidth - 50;
  viewportHeight = window.innerHeight - 50;
iframe.attr("width", viewportWidth);
iframe.attr("height", viewportHeight);
}
windowResize();
$(window).resize(function() {
  windowResize();

});
