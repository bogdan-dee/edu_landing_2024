export const ProfessionPage = (($) => {

    function factsCounter() {
        // Facts counter
        $('[data-toggle="counter-up"]').counterUp({
            delay: 5,
            time: 2000
        });
    }

    function skillsSlider() {
        // Skills
        $('.skill').waypoint(function () {
            $('.progress .progress-bar').each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + '%');
            });
        }, {offset: '80%'});
    }

    return {
        factsCounter: factsCounter,
        skillsSlider: skillsSlider
    }
})(jQuery);