$(".panel").click(function(event) {
  event.preventDefault();
  let link = event.currentTarget.dataset.link
  
  if (link === "Poem") {
    
  }
  else if (link === "nextPoem"){
    loadNewPoem();
  } else {
    $(".panel").addClass("collapse");
    $(this).removeClass("collapse");
    $("#gedicht-panel").empty();
  }
});

const loadNewPoem = function() {
  console.log("load new Poem")
  $(".panel").addClass("collapse");
  $("#gedicht-panel").empty();
  let timeoutID = window.setTimeout(showPoem, 300);
  $("#gedicht-panel").load("/newpoem", function() {
  console.log('sucess loading')
  $('.move-marker').hover(handlerIn, handlerOut)
  });
}

const showPoem = function() {
  $("#gedicht-panel").removeClass("collapse");
}


$( "#intro" ).click(function() {
  hideIntro();
});

$(".intro-text").hide().delay(2000).fadeIn(4000);


const hideIntro = function() {
    $("main").animate({
    left: "0%"
  }, 1000, function() {
    // Animation complete.
  });
  $("#intro").animate({
    left: "100%"
  }, 1000, function() {
    // Animation complete.
  });
}

setTimeout(function(){ hideIntro(); }, 15000);


// zeige Beschreibung bei hover an:
$('body').append('<div id="hoverbox"/>');
$(document).mousemove(function(mTC){
        var textwith = $('#hoverbox').width();
        $('#hoverbox').css({top:(mTC.clientY+1)+'px',left:(mTC.clientX)+'px'});
    });

$('.move-marker').hover(handlerIn, handlerOut)

let bsTitel

function handlerIn(event) {
  console.log(this)
  bsTitel = $(this).attr('data-mt');
  $('#hoverbox').fadeTo(300, 1).html( bsTitel );
  
}
function handlerOut() {
   $('#hoverbox').hide().html('');
   $(this).attr('data-mt', bsTitel);
}


// Animiere Gifs on hover

$(function () {
  $(".gif").hover(
    function () {
      var src = $(this).attr("src");
      $(this).attr("src", src.replace(/\_static.png$/i, ".gif"));
    },
    function () {
      var src = $(this).attr("src");
      $(this).attr("src", src.replace(/\.gif$/i, "_static.png"));
    });
});

// Load images after dom is ready and before the $(".gif").hover() function is active

var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}
preload(
    "img/diy/VIDEO1.gif",
    "img/diy/VIDEO2.gif",
    "img/diy/VIDEO3.gif",
    "img/diy/VIDEO4_2.gif"
)

let pdistance = 0
let normalizeDistance = 0

// P5 Sketch at about Page 

var sketchAbout = function( p ) {
  p.setup = function() {
    p.frameRate(60);
    p.createCanvas(window.innerWidth,window.innerHeight);
  };

  p.draw = function() {
//    p.background(255);
    let counter = p.sin(p.frameCount / 100)
    let colorCounter = p.map(counter, -1,1,0,15);
    p.colorMode(p.HSB, 100);
    let c = p.color(colorCounter, 100, 100);
    
    p.strokeWeight((normalizeDistance + pdistance) / 2);
    p.stroke(c)
    
    if (p.pmouseX != 0) {
      p.line(p.mouseX,p.mouseY,p.pmouseX,p.pmouseY)
    }
    
    let distance = p.int(p.dist(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY));
    normalizeDistance = (distance / 4) + 200;
    pdistance = (normalizeDistance + pdistance) / 2;

    
  };

  p.mousePressed = function() {
    p.clear();
  };
}

var myp5 = new p5(sketchAbout, 'canvas-about');