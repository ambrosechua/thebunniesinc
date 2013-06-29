$(document).ready(function() {

var step=3;
var stti=10;
var frames=stti/2;
var interf=0;
var interb=0;
var interl=0;
var interr=0;
var player={
x: 0,
y: 0,
health: 100,
weapon: 0
};
var evil=[];

function spawnevil() {
newevil=$('<div class="evil"></div>');
where=Math.floor(Math.random()+0.5);
if (where==0) {
top=0;
left=Math.floor(Math.random()*window.innerWidth+0.5);
}
else if (where==1) {
left=0;
top=Math.floor(Math.random()*window.innerHeight+0.5);
}
newevil.css("left", left+"px");
newevil.css("top", top+"px");
$("#frame").append(newevil);
}

function angle(x, y, bx, by) {
return Math.atan2(bx-x, by-y)/Math.PI*-180;
}

function dpf() {
map.panBy(0, -step);
player.x -= step;
}
function dpb() {
map.panBy(0, step);
player.x += step;
}
function dpl() {
map.panBy(-step, 0);
player.y -= step;
}
function dpr() {
map.panBy(step, 0);
player.y += step;
}

window.addEventListener('load', function(e) {
window.applicationCache.addEventListener('updateready', function(e) {
if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
window.applicationCache.swapCache();
if (confirm('An update for this game has been downloaded. Update now? ')) {
window.location.reload();
}
} else {
}
}, false);
}, false);

function setin(dir) {
//functorun=functor;
//functorun();
if (dir==0 && !interf) {
interf=setInterval(function() {
dpf();
}, stti);
}
if (dir==1 && !interb) {
interb=setInterval(function() {
dpb();
}, stti);
}
if (dir==2 && !interl) {
interl=setInterval(function() {
dpl();
}, stti);
}
if (dir==3 && !interr) {
interr=setInterval(function() {
dpr();
}, stti);
}
}
function clrin(dir) {
if (dir==0) {
clearInterval(interf);
interf=0;
}
if (dir==1) {
clearInterval(interb);
interb=0;
}
if (dir==2) {
clearInterval(interl);
interl=0;
}
if (dir==3) {
clearInterval(interr);
interr=0;
}
}

if (!(("ontouchstart" in window) || ("onmsgesturechange" in window))) {
$("#dpf, #dpb, #dpl, #dpr").css("display", "none");
}

//stackoverflow
function getPosition(e) {
var targ;
if (!e)
e = window.event;
if (e.target)
targ = e.target;
else if (e.srcElement)
targ = e.srcElement;
if (targ.nodeType == 3)
targ = targ.parentNode;
var x = e.pageX - $(targ).offset().left;
var y = e.pageY - $(targ).offset().top;
$("#dirh").css("transform", "rotate("+angle(x, y, $("#you").width()/2, $("#you").height()/2)+"deg)");

}

function start() {

$("#tgpm").fadeOut();

counter=setInterval(function() {
timenow=new Date().getTime();
sec=timenow-timebefore;
$("#sec").html(sec+"ms");
}, 1);


$("#you").on("mousedown", function(event) {
getPosition(event);
});
$("#you").on("mousemove", function(event) {
getPosition(event);
});
$("#you").on("mouseup", function(event) {
getPosition(event);
});


if (("ontouchstart" in window) || ("onmsgesturechange" in window)) {
$("#dpf").on("touchstart", function() {
setin(0);
});
$("#dpb").on("touchstart", function() {
setin(1);
});
$("#dpl").on("touchstart", function() {
setin(2);
});
$("#dpr").on("touchstart", function() {
setin(3);
});
$("#dpf").on("touchend", function() {
clrin(0);
});
$("#dpb").on("touchend", function() {
clrin(1);
});
$("#dpl").on("touchend", function() {
clrin(2);
});
$("#dpr").on("touchend", function() {
clrin(3);
});
}
else {

$("#dpf").on("mousedown", function() {
setin(0);
});
$("#dpb").on("mousedown", function() {
setin(1);
});
$("#dpl").on("mousedown", function() {
setin(2);
});
$("#dpr").on("mousedown", function() {
setin(3);
});
$("#dpf").on("mouseup", function() {
clrin(0);
});
$("#dpb").on("mouseup", function() {
clrin(1);
});
$("#dpl").on("mouseup", function() {
clrin(2);
});
$("#dpr").on("mouseup", function() {
clrin(3);
});
}

$(document).off("keydown");

wasdown=0;
$(document).on("keydown", function(eve) {
w=eve.which;
if (w==87) {
setin(0);
}
else if (w==83) {
setin(1);
}
else if (w==65) {
setin(2);
}
else if (w==68) {
setin(3);
}
else if (w==38) {
setin(0);
}
else if (w==40) {
setin(1);
}
else if (w==37) {
setin(2);
}
else if (w==39) {
setin(3);
}
else if (w==27 || w==81) {
end();
}
});
$(document).on("keyup", function(eve) {
w=eve.which;
if (w==87) {
clrin(0);
}
else if (w==83) {
clrin(1);
}
else if (w==65) {
clrin(2);
}
else if (w==68) {
clrin(3);
}
else if (w==38) {
clrin(0);
}
else if (w==40) {
clrin(1);
}
else if (w==37) {
clrin(2);
}
else if (w==39) {
clrin(3);
}
});
}


function end() {
clrin(0);
clrin(1);
clrin(2);
clrin(3);
clearInterval(counter);
$("#you").off("mousedown").off("mousemove").off("mouseup");
if (("ontouchstart" in window) || ("onmsgesturechange" in window)) {
$("#dpf").off("touchstart").off("touchend");
$("#dpb").off("touchstart").off("touchend");
$("#dpl").off("touchstart").off("touchend");
$("#dpr").off("touchstart").off("touchend");
}
else {
$("#dpf").off("mousedown").off("mouseup");
$("#dpb").off("mousedown").off("mouseup");
$("#dpl").off("mousedown").off("mouseup");
$("#dpr").off("mousedown").off("mouseup");
}
wasdown=0;
$(document).off("keyup").off("keydown");
$(document).on("keydown", function(eve) {
if (eve.which==27 || eve.which==81) {
start();
}
});
$("#tgpm").fadeIn();
}



function getready() {
$("#menu").fadeOut();
$("#bar").css("background-color", "rgba(0, 0, 0, 0.5)");
$("#sec").html("Ready");
$("#bunny").fadeIn();
setTimeout(function() {
$("#sec").html("Set");
}, 2000);
setTimeout(function() {
$("#sec").html("Go! ");
}, 4000);
setTimeout(function() {
$("#kills").html("0 kills");
$("#tgp").fadeIn().click(function() {
end();
});
$("#cont").click(function() {
start();
});


timebefore=new Date().getTime();
start();
}, 4500);
}

$("#endg").click(function() {
window.location.reload();
});
$("#aboutc").click(function() {
$("#aboutc").fadeOut();
});
$("#about").click(function() {
$("#aboutc").fadeIn();
});
$("#optionsc").click(function() {
$("#optionsc").fadeOut();
});
$(".options").click(function() {
$("#aboutc").fadeIn();
});

$("#play").click(function() {
getready();
});

$("#opt-maptype").change(function() {
x=["h", "r", "s", "t"].indexOf($("#opt-maptype > option:selected").val());
maptype=[google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN][x];
map.setMapTypeId(maptype);
});

});