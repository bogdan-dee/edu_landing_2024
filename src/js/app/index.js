import {HomePage} from "./pages/home.js";
import {ProfessionPage} from "./pages/profession.js";
import {ContactsPage} from "./pages/contact.js";
import {spinner} from "./helpers/spinner.js";
import {backToTop} from "./helpers/backtotop.js";

export const LandingApp = (($, WOW) => {
    // Spinner



    const init = () => {
        // Initiate Spinner
        spinner();
        // Initiate the wowjs
        new WOW().init();
        // Initiate back-to-top button
        backToTop();

        // Init home page scripts
        if ($('#home').attr('id') !== undefined) {
            HomePage.scrolling();
            HomePage.typed();
        }

        // Init profession page scripts
        if ($('#skill').attr('id') !== undefined) {
            ProfessionPage.factsCounter();
            ProfessionPage.skillsSlider();
        }

        // Init contacts page scripts
        if ($('#contact').attr('id') !== undefined) {
            ContactsPage.focusOnName();
        }
    }

    init();

    return {
        init: init
    }
})(jQuery, WOW);