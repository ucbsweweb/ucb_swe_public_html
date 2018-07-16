$(document).ready(function() {

        // Transition effect for navbar and back-to-top icon
        $(window).scroll(function() {
          // checks if window is scrolled more than 500px, adds/removes solid class
          if($(this).scrollTop() > 540) {
              $('.navbar').addClass('back');
          } else {
              $('.navbar').removeClass('back');
          }
        });
});
