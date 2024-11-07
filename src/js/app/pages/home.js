export const HomePage = (($) => {

    function scrolling() {
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
    }

    function typed() {
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

    return {
        scrolling: scrolling,
        typed: typed
    }
})(jQuery);