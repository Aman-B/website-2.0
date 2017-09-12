$(document).ready(function(){       
   var scroll_start = 0;
   var startchange = $('.startchange');
  
    var size= screen.width
   if( size> 480)
   {
      $('.color-change').css('color', '#FFF');
       var offset = startchange.offset();
        if (startchange.length){
       $(document).scroll(function() { 
          scroll_start = $(this).scrollTop();
          if(scroll_start > offset.top) {
              $(".navbar").css('background-color', '#FFF');
              $('.color-change').css('color', '#000');
           } else {
              $('.navbar-default').css('background-color', 'transparent');
              $('.color-change').css('color', '#FFF');
           }
       });
        }
   }
   
});