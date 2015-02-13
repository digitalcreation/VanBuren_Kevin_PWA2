/*  
	Project Spiral
	Author: Kevin Van Buren
*/

(function($){
/*----------------------------------- Tooltip -----------------------------------*/
	$('.masterTooltip').hover(function(){
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
            .text(title)
            .appendTo('body')
            .fadeIn('slow');
    }, function(){
            $(this).attr('title', $(this).data('tipText'));
            $('.tooltip').remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 5;
        var mousey = e.pageY + 5;
        $('.tooltip')
            .css({top: mousey, left: mousex})
    });
/*----------------------------------- Tabbed Accordion -----------------------------------*/
	$('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();
    $('#tabs-nav li').click(function(e) {
        e.preventDefault();
        $('#tabs p').hide();
        $('#tabs-nav .current').removeClass("current");
        $(this).addClass('current');
        var clicked = $(this).find('a:first').attr('href');
        $('#tabs ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');
    /* --- Mouse Hover Effect for Tabbed Accordion Buttons --- */
    $('#tabs-nav li').hover(function(){
        $(this).stop(true, false).animate({ duration: '800', opacity: '.5'});
    }, function(){
        $(this).stop(true, false).animate({  opacity: '100' });
    });
/*----------------------------------- Modal -----------------------------------*/
    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeIn()
            .find('#modal')
            .fadeIn();
    });
    $('.close').on('click', function(event){
       event.preventDefault();
        $('#overlay')
            .fadeOut()
            .find('#modal')
            .fadeOut();
    });
    /*--------------------- Fading Status ---------------------*/
    $('.mystatus').mouseover(function(){
       $(this).fadeTo(100,.3);
    });
    $('.mystatus').mouseout(function(){
        $(this).fadeTo(100, 1);
    });
})(jQuery); // end private scope




