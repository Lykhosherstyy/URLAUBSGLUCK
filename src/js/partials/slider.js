$(document).ready(function(){
  
  //// ---> Проверка на существование элемента на странице
  $.fn.exists = function() {
     return $(this).length;
  }

  //// ---> Слайдер
  $(function(){
    if($('.slider').exists()) {

      $('.slider').each(function(){

        var slider = $(this);

        var slideWrap = slider.find('.slide-wrap'),
            nextLink = slider.find('.next-slide'),
            prevLink = slider.find('.prev-slide'),
            slideWidth = slider.find('.slide-item').outerWidth(),
            scrollSlider = slideWrap.position().left - slideWidth;

        /* Клик по ссылке на следующий слайд */
        nextLink.click(function(){
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
        prevLink.click(function(){
        if(!slideWrap.is(':animated')) {
          slideWrap
            .css({'left': scrollSlider})
            .find('.slide-item:last')
            .prependTo(slideWrap)
            .parent()
            .animate({left: 0}, 500);
          }
        });

      });

    }

  });

});