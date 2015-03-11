$(document).ready(function() {
//    if (message) {
//        displayMessage(message);
//    }

    var config = {
         sensitivity: 10, // number = sensitivity threshold (must be 1 or higher)
         interval: 100, // number = milliseconds for onMouseOver polling interval
         over: megaHoverOver, // function = onMouseOver callback (REQUIRED)
         timeout: 100, // number = milliseconds delay before onMouseOut
         out: megaHoverOut // function = onMouseOut callback (REQUIRED)
    };

    $("ul#navBar li .sub").css({'opacity':'0'});
    $("ul#navBar li").hoverIntent(config);
});

function popUp(URL) {
    window.open(URL, Math.random(), 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=0,width=800,height=550');
}

function displayMessage(message) {
    //TODO: do something graceful if there is no message div on the page

    messageDiv = $("div[id='message']");
    messageDiv.html("<p style=\"color: black\">"+message+"</div>"); //temp till a designer designs a normal message
    messageDiv.show();
    try {
        if (!$.curCSS) {
            $.curCSS = $.css;
        }
        messageDiv.effect("highlight", {color: '#fffeeb'}, 1000);
    } catch (e) { }
}

function showhide(id){
    if (document.getElementById){
        obj = document.getElementById(id);
        if (obj.style.display == "none"){
            obj.style.display = "";
        } else {
            obj.style.display = "none";
        }
    }
}

function megaHoverOver(){ //Show popup windows when hovering tab names
    $(this).find(".sub").stop().fadeTo('fast', 1).show();

    //Calculate width of all ul's
    (function($) {
        jQuery.fn.calcSubWidth = function() {
            rowWidth = 0;
            //Calculate row
            $(this).find("ul").each(function() {
                rowWidth += $(this).width();
            });
        };
    })(jQuery);

    if ( $(this).find(".row").length > 0 ) { //If row exists...
        var biggestRow = 0;
        //Calculate each row
        $(this).find(".row").each(function() {
            $(this).calcSubWidth();
            //Find biggest row
            if(rowWidth > biggestRow) {
                biggestRow = rowWidth;
            }
        });
        //Set width
        $(this).find(".sub").css({'width' :biggestRow});
        $(this).find(".row:last").css({'margin':'0'});

    } else { //If row does not exist...

        $(this).calcSubWidth();
        //Set Width
        $(this).find(".sub").css({'width' : rowWidth});

    }
}

function megaHoverOut(){
    $(this).find(".sub").stop().fadeTo('fast', 0, function() {
        $(this).hide();
    });
}

function limitText(limitField, limitCount, limitNum) { // Limits characters
 if (limitField.value.length > limitNum) {
 limitField.value = limitField.value.substring(0, limitNum);
 } else {
     if (limitCount === undefined) var limitCount = '';
     limitCount.value = limitNum - limitField.value.length;
 }
}

$(document).on('click', 'a[rel=show_popup]', function() {
    show_popup_block(this.id);
    return false;
});

$(document).on('touchstart click', '#popup_block_close, #fade', function() {
    hide_popup_block();
    return false;
});

function show_popup_block(id){
    var block = $('#'+id+'.popup_block');
    var popMargLeft = (block.width() / 2)+15;
    var popMargTop = (block.height() / 2);
    block.prepend('<div id="popup_block_close"></div>');
    block.css({
        'margin-left' : -popMargLeft,
        'margin-top' : -popMargTop,
        'display': 'block'
    });
    $('body').append('<div id="fade"></div>');
    $('#fade').css({'filter' : 'alpha(opacity=60)'}).fadeIn(); // Filtr for IE
    return false;        
}

function hide_popup_block(){
    $('#fade , .popup_block').fadeOut(function() {
        $('#fade, #popup_block_close').remove();
    });
    return false;    
}

// Close popup from key "esc"
document.onkeydown = function checkKeycode(event)
{
    if (!$('.popup_block').is(':visible')) return;
    var keycode;
    if (!event) var event = window.event;
    if (event.keyCode) keycode = event.keyCode; // IE
    else if(event.which) keycode = event.which; // all browsers
    if (keycode == 27) hide_popup_block();
}

