$(document).ready(function(){
$( ".sub_menu a" ).hover(
  function() {
    $( this ).children('div').append('<span>'+$(this).next().text()+'</span>' );
    $( this ).next().hide();
  }, function() {
    $( this ).find( "span:last" ).remove();
    $( this ).next().show();
  }
);
});