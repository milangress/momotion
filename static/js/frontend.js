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

//$.fn.beschreibung = function() {
//    'use strict';    
//    var bsElement = this;    
//    $('body').append('<div id="hoverbox"/>');
//    $(document).mousemove(function(mTC){
//        var textwith = $('#hoverbox').width();
//        $('#hoverbox').css({top:(mTC.clientY+1)+'px',left:(mTC.clientX-textwith/2)+'px'});
//    });
//    bsElement.each(function(){
//     var bsSub = $(this);
//     var bsTitel = bsSub.attr('title');   
//     bsSub.hover(function(){
//        $('#hoverbox').fadeTo(300, 1).html( bsTitel );        
//        bsSub.attr('title', '');
//    },function(){
//        $('#hoverbox').hide().html('');
//        bsSub.attr('title', bsTitel);
//    });
// });
//};

//var aboutLink = document.querySelector('.about');
//aboutLink.addEventListener('click', showAbout);
//
//
//var MouseX = 
//aboutLink.style.top("MouseX")
//
//  const aboutPage = document.querySelector('.about-site')
//  const gedicht = document.querySelector('.main-text')
//  aboutPage.classList.add("hide");
//
//  
//
//function showAbout(event) {
//  event.preventDefault();
//  aboutPage.classList.remove("hide");
//  aboutPage.classList.add("active");
//  gedicht.classList.add("hide");
//  gedicht.classList.remove("active");
//}

//function initAccordion(accordionElem){
//  
//  //when panel is clicked, handlePanelClick is called.          
//
//  function handlePanelClick(event){
//      showPanel(event.currentTarget);
//    event.preventDefault();
//  }
//
////Hide currentPanel and show new panel.  
//  
//  function showPanel(panel){
//    //Hide current one. First time it will be null. 
//     var expandedPanel = accordionElem.querySelector(".active");
//     if (expandedPanel){
//         expandedPanel.classList.remove("active");
//     }
//
//     //Show new one
//     panel.classList.add("active");
//
//  }
//
//  var allPanelElems = accordionElem.querySelectorAll(".panel");
//  for (var i = 0, len = allPanelElems.length; i < len; i++){
//       allPanelElems[i].addEventListener("click", handlePanelClick);
//  }
//
//  //By Default Show first panel
//  showPanel(allPanelElems[0])
//
//}
//
//initAccordion(document.querySelector("main"));