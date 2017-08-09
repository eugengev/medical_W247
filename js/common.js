'use strict';
if(!window.console) window.console = {};
if(!window.console.memory) window.console.memory = function() {};
if(!window.console.debug) window.console.debug = function() {};
if(!window.console.error) window.console.error = function() {};
if(!window.console.info) window.console.info = function() {};
if(!window.console.log) window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------
if(!Modernizr.flexbox) {
  (function() {
    var
      $pageWrapper = $('#page-wrapper'),
      $pageBody = $('#page-body'),
      noFlexboxStickyFooter = function() {
        $pageBody.height('auto');
        if($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
          $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
        } else {
          $pageWrapper.height('auto');
        }
      };
    $(window).on('load resize', noFlexboxStickyFooter);
  })();
}
if(ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
  (function(){
    var
      $pageWrapper = $('#page-wrapper'),
      $pageBody = $('#page-body'),
      ieFlexboxFix = function() {
        if($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
          $pageWrapper.height($(window).height());
          $pageBody.removeClass('flex-none');
        } else {
          $pageWrapper.height('auto');
        }
      };
    ieFlexboxFix();
    $(window).on('load resize', ieFlexboxFix);
  })();
}

$(function() {
// placeholder
//-----------------------------------------------------------------------------
    $('input[placeholder], textarea[placeholder]').placeholder();

    $('.js-slide-main').slick({
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('a[data-toggle="tab"]').click(function(){
        var idblock = $(this).attr('href');

        $(this).parents('div[role="tabpanel"]').find('ul[role="tablist"]').find('li').removeClass('active');
        $(this).parents('div[role="tabpanel"]').find('div[role="tabpanel"]').removeClass('active');

        $(this).parents('li[role="presentation"]').addClass('active');
        $(idblock).addClass('active');
        return false;
    });

    $('.js-btn-mobile-menu').click(function () {
        var el = $('.js-mobile-menu');
        if (el.css('display') == 'none') {
            el.slideDown();
        } else {
            el.slideUp();
        }
    });

    $('.js-serv-list').click(function () {
        var el = $(this).parents('h4').next('ul');

        if (el.css('display') == 'none') {
            el.slideDown();
        } else {
            el.slideUp();
        }
    });


});

var map;
function initMap() {
    var myLatLng = {lat: 49.4225715, lng: 26.9763337};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        scrollwheel: false,
        center:  {lat: 49.4225715, lng: 26.9763337},  // Brooklyn.
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        }
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'ТОчка на карте'
    });
}




$(document).on('click.modal', 'a[rel="modal:close"]', function(event) {
    // event.preventDefault();
    var modalBlock = $(this).parents('.modall');
    $('.modalbgblock').remove();
    modalBlock.find('.close-modal').remove();
    modalBlock.hide();
});

$(document).on('click.modal', '.modalbgblock', function(event) {
    event.preventDefault();
    var idHref = $(this).data('modalblock'),
        modalBlock = $(idHref);
    $('.modalbgblock').remove();
    modalBlock.find('.close-modal').remove();
    modalBlock.hide();
});

$(document).on('click.modal', 'a[rel="modal:open"]', function(event) {
    event.preventDefault();
    /*skull    */
    var $self = $(this),
        $parentItem = $self.parents('.slide-costum__item');
    if ($parentItem.find('.js-skul').length > 0) {
        var skul = $parentItem.find('.js-skul').text();
        $('#your-skul').val(skul);
    }


    if ($('.modalbgblock').length > 0 ) {
        var idHref = $('.modalbgblock').data('modalblock'),
            modalBlock = $(idHref);

        $('.modalbgblock').remove();
        modalBlock.find('.close-modal').remove();
        modalBlock.hide();
    }
    var bgModal = $('<span class="modalbgblock"></span>'),
        modalClose = $('<a href="#close-modal" rel="modal:close" class="close-modal"></a>'),
        idHref = $(this).attr('href'),
        formSend = $(this).data('formsend'),
        modalBlock = $(idHref);

    bgModal.data('modalblock',idHref);
    $('body').append(bgModal);
    modalBlock.append(modalClose);
    modalBlock.show();
});