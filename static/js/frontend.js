const aboutLink = document.querySelector('.about');
aboutLink.addEventListener('click', showAbout);

  const aboutPage = document.querySelector('.about-site')
  const gedicht = document.querySelector('.main-text')
  aboutPage.classList.add("hide");

  

function showAbout(event) {
  event.preventDefault();
  aboutPage.classList.remove("hide");
  aboutPage.classList.add("active");
  gedicht.classList.add("hide");
  gedicht.classList.remove("active");
}

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