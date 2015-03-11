$(document).ready(function () {
    $(window).resize(function () {
        var winBr = $(window).width();
//        console.log($('#vvv').lastChild);
        if (winBr < 485) {
            $('#vvv').addClass('passive_head');
            $('.butt_head_top').addClass('active_head');
            $('.col_form_head_top').addClass('for_col_form_head_top');
        } else {
            $('#vvv').removeClass('passive_head');
            $('.butt_head_top').removeClass('active_head');
            $('.col_form_head_top').removeClass('for_col_form_head_top');
        };

        if (winBr < 769) {
             $(".aw-accordion li").mouseover(function () {
                  $(this).css('width', '45%');
                  $(this).siblings('li').css('width', '8%');
             });}
        else
                   $(".aw-accordion li").unbind();

    });

    $('.dropdown-toggle').dropdown();

});

