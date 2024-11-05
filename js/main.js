(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 100);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();

    // Block for Home page
    if ($('#home').attr('id') !== undefined) {
        // Smooth scrolling on the navbar links
        $(".navbar-nav a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $(this.hash).offset().top - 70
                }, 300, 'easeInOutExpo');

                if ($(this).parents('.navbar-nav').length) {
                    $('.navbar-nav .active').removeClass('active');
                    $(this).closest('a').addClass('active');
                }
            }
        });



        // Typed Initiate
        if ($('.typed-text-output').length == 1) {
            var typed_strings = $('.typed-text').text();
            var typed = new Typed('.typed-text-output', {
                strings: typed_strings.split(', '),
                typeSpeed: 100,
                backSpeed: 20,
                smartBackspace: false,
                loop: true
            });
        }
    }

    // Block for Profession page
    if ($('#skill').attr('id') !== undefined) {
        // Facts counter
        $('[data-toggle="counter-up"]').counterUp({
            delay: 5,
            time: 2000
        });


        // Skills
        $('.skill').waypoint(function () {
            $('.progress .progress-bar').each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + '%');
            });
        }, {offset: '80%'});
    }

    // Block for Contact page
    if ($('#contact').attr('id') !== undefined) {
        setTimeout(() => {
            $('#name').focus();
        }, 500);
    }

    
})(jQuery);

