$(".panel").click(function(event) {
  event.preventDefault();
  let link = event.currentTarget.dataset.link
  
  if (link === "nextPoem"){
    loadNewPoem();
  } else {
    $(".panel").addClass("collapse");
    $(this).removeClass("collapse");
  }
});

const loadNewPoem = function() {
  console.log("load new Poem")
//  TODO
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
