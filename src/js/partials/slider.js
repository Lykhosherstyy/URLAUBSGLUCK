
$(document).ready(function(){
 function MySlider(){

  var slideWrap = $('.slide-wrap');
  var nextLink = $('.nextbutton');
  var prevLink = $('.prewbutton');
  var is_animate = false;
  var slideWidth = $('.slide-item').innerWidth();
  var scrollSlider = slideWrap.position().left - slideWidth;

   /* Клик по ссылке на следующий слайд */
    nextLink.click(function(e){
       e.preventDefault();
   if(!slideWrap.is(':animated')) {
    slideWrap.animate({left: scrollSlider}, 500, function(){
     slideWrap
      .find('.slide-item:first')
      .appendTo(slideWrap)
      .parent()
      .css({'left': 0});
    });
   }
  });
		
  /* Клик по ссылке на предыдующий слайд */
    prevLink.click(function(e){
      e.preventDefault();
   if(!slideWrap.is(':animated')) {
    slideWrap
     .css({'left': scrollSlider})
     .find('.slide-item:last')
     .prependTo(slideWrap)
     .parent()
     .animate({left: 0}, 500);
   }
  });

  function autoplay(){
   if(!is_animate){
    is_animate = true;
    slideWrap.animate({left: scrollSlider}, 3500, function(){
     slideWrap
      .find('.slide-item:first')
      .appendTo(slideWrap)
      .parent()
      .css({'left': 0});
     is_animate = false;
    });
   }
  }
 }
 
MySlider();
});
