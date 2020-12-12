/*-----------------------------------------------------------------------------------
 Template Name: DBlog
 File Name: scripts.js
 Author: Damian Komoński (komon.ski)
 Version: 1.0
 -----------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------

 [CONTENT]

 1. Webfont
 2. Google Contact Map
 3. Retina.js
 4. Mobile Navigation
 5. Animation Nav Menu Icon
 6. Counters Number
 7. Owl Carousel
 8. Comments Margin in Blog Post
 9. Responsive Navigation
 10. Search Top Header Navigation
 11. Portfolio Filter


 -----------------------------------------------------------------------------------*/
/*-------------------------------------- 1. Webfont --------------------------------------*/
WebFont.load({
    google: {
        families: [
            'Lato:400,400italic,900,900italic',
            'Merriweather:400,400italic,700,700italic'],
    },
});

/*-------------------------------------- 2. Google Contact Map --------------------------------------*/
function initMap () {
    var mapDiv = document.getElementById('contact-map-inside');
    var map = new google.maps.Map(mapDiv, {
        center: { lat: 40.7058254, lng: -74.1180847 },
        zoom: 12,
    });
}

$(document).ready(function () {

    /*-------------------------------------- 3. Retina.js --------------------------------------*/
    retinajs();

    /*-------------------------------------- 4. Mobile Navigation --------------------------------------*/
    $('.header-top-nav-menu-icon').on('click', function () {
        $('.mobile-nav').toggleClass('mobile-nav-open');
        $('body').toggleClass('noscroll');
    });

    //Submenu
    $(document).on('click', '.dropdown-toggle', function (event) {
        $(this).parent().toggleClass('open');
    });

    /*-------------------------------------- 5. Animation Nav Menu Icon --------------------------------------*/
    $(document).on('click', '#menu-animate-icon', function () {
        $(this).toggleClass('open');
    });

    /*-------------------------------------- 6. Counters Number --------------------------------------*/
    $('.counters-one h2').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text(),
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            },
        });
    });

    /*-------------------------------------- 7. Owl Carousel --------------------------------------*/
    $('#articles-preview-img').owlCarousel({
        loop: true,
        nav: true,
        navText: [
            '<i class="pe-7s-angle-left"></i>',
            '<i class="pe-7s-angle-right"></i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
        },
    });

    /*-------------------------------------- 8. Comments Margin in Blog Post --------------------------------------*/
    $('.comments ol li:has(.comment-response) > .comment').
        addClass('comment-small-margin');
});

/*-------------------------------------- 9. Responsive Navigation --------------------------------------*/
function adjustStyle (width) {
    var width = parseInt(width);
    var menuContents = $('.header-nav').html();

    if (width < 992) {
        $('.mobile-nav > div > div > div').html(menuContents);
    }
}

adjustStyle($(window).width());
$(window).on('resize', function () {
    adjustStyle($(this).width());
});

/*-------------------------------------- 10. Search Top Header Navigation --------------------------------------*/
var searchIcon = $('.header-top-nav-search > a'),
    searchForm = $('.header-top-nav-search > form');

$(document).on('click', '.header-top-nav-search > a', function () {
    searchIcon.fadeOut(200);
    searchForm.delay(240).fadeIn(200);
});

/*-------------------------------------- 11. Portfolio Filter --------------------------------------*/
var amountItems = $('.portfolio .portfolio-item').length,
    portfolioMenuLink = $('.portfolio-menu a'),
    emptyPortfolio = $('.portfolio .portfolio-empty'),
    portfolioItem = $('.portfolio .portfolio-item');

function portfolioUpdate (category, link) {
    var amountActiveItems = $(
        '.portfolio .portfolio-item[data-portfolio="' + category + '"]').length;

    $('.portfolio-menu li').removeClass('active');
    $(link).parent().addClass('active');

    //if selected category is ALL, show all portfolio items and end function
    if (category == 'all') {
        emptyPortfolio.fadeOut(500);
        portfolioItem.delay(400).fadeIn(500);
        return;
    }

    portfolioItem.fadeOut(500);
    emptyPortfolio.fadeOut(500);
    $('.portfolio .portfolio-item[data-portfolio="' + category + '"]').
        delay(400).
        fadeIn(500);

    if (amountActiveItems === 0) {
        emptyPortfolio.delay(400).fadeIn(500);
    }
}

if (amountItems === 0) {
    emptyPortfolio.fadeIn(500);
}

$(document).on('click', '.portfolio-menu a', function () {
    var category = $(this).attr('data-portfolio');
    portfolioUpdate(category, this);
});
