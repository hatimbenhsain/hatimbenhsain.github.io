window.onload=function(){
    document.getElementById("main").onmouseover=function(){
        document.getElementById("intro").style.opacity=1;
        document.getElementById("pic1").style.opacity=1;
    };
};
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

})

$(window).on("load",function() {
  let clickcounter=0
  var arrowimage=document.getElementById('arrowimage');
  var comic1 = document.getElementById("comic1svg").contentDocument.documentElement;
  var comic2=document.getElementById("comic2svg").contentDocument.documentElement;
  var comic3=document.getElementById("comic3svg").contentDocument.documentElement;
  var comic5=document.getElementById("comic5svg").contentDocument.documentElement;
  var comic4=document.getElementById("comic4svg").contentDocument.documentElement;
  var comic6=document.getElementById("comic6svg").contentDocument.documentElement;
  var dragon= comic2.getElementById("dragonColors");
  var dragonBW=comic2.getElementById("dragonBW");
  var princess= comic2.getElementById("princessColors");
  var hero=comic2.getElementById("heroColors")
  var heroText4=comic4.getElementById("heroText4");
  var dragonText4=comic4.getElementById("dragonText4");
  var princessText4=comic4.getElementById("princessText4");
  var heroText5=comic5.getElementById("heroText5");
  var dragonText5=comic5.getElementById("dragonText5");
  var princessText5=comic5.getElementById("princessText5");
  var heroText6=comic6.getElementById("heroText6");
  var dragonText6=comic6.getElementById("dragonText6");
  var princessText6=comic6.getElementById("princessText6");
  var downarrow=document.getElementById('downarrow')
  let yo=document.getElementById('yo')
  dragon.style.opacity=0
  princess.style.opacity=0
  hero.style.opacity=0;
  $(downarrow).click(
    ()=>{
      clickcounter=clickcounter+1;
      downarrow.setAttribute('href',('#comic'+(clickcounter).toString()+'svg'))
      if (clickcounter==7){
        console.log(yo)
        $("html").removeClass('yo')}
    })


  $(comic2).hover(
    () => {
      console.log('hovering')
      dragon.style.opacity=1
      princess.style.opacity=1;
      hero.style.opacity=1;
      comic2.style.cursor='pointer';
    },
    () => {
      dragon.style.opacity=0
      princess.style.opacity=0;
      hero.style.opacity=0;
    })
$(comic3).hover(
() =>{
  comic3.style.cursor='pointer';
}
)
$(comic4).hover(
() =>{
  comic4.style.cursor='pointer';
}
)
$(comic5).hover(
() =>{
  comic5.style.cursor='pointer';
}
)
$(comic6).hover(
() =>{
  comic6.style.cursor='pointer';
}
)

  $(dragon).click(
    () =>{
      console.log("ehey")
      heroText4.style.opacity=0;
      dragonText4.style.opacity=1;
      princessText4.style.opacity=0;
      heroText5.style.opacity=0;
      dragonText5.style.opacity=1;
      princessText5.style.opacity=0;
      heroText6.style.opacity=0;
      dragonText6.style.opacity=1;
      princessText6.style.opacity=0;
      arrowimage.src='down-arrow-pink.png'
    }
  )
  $(princess).click(
    () =>{
      heroText4.style.opacity=0;
      dragonText4.style.opacity=0;
      princessText4.style.opacity=1;
      heroText5.style.opacity=0;
      dragonText5.style.opacity=0;
      princessText5.style.opacity=1;
      heroText6.style.opacity=0;
      dragonText6.style.opacity=0;
      princessText6.style.opacity=1;
      arrowimage.src='down-arrow-pink.png'
    }
  )
  $(hero).click(
    () =>{
      heroText4.style.opacity=1;
      dragonText4.style.opacity=0;
      princessText4.style.opacity=0;
      heroText5.style.opacity=1;
      dragonText5.style.opacity=0;
      princessText5.style.opacity=0;
      heroText6.style.opacity=1;
      dragonText6.style.opacity=0;
      princessText6.style.opacity=0;
      arrowimage.src='down-arrow-pink.png'
    }
  )
})
