/**
 * Created by Vikky on 02.10.2014.
 */


    $(function() {
        $(window).resize(function(){
            var winBr = $(window).width();
            if(winBr<750)$('.navbar-text').addClass('text_2')
            else{
                $('.navbar-text').addClass('text_1');
                $('.navbar-text').removeClass('text_2');
            };
        });



    });


