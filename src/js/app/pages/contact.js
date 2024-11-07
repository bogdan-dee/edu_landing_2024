export const ContactsPage = (($) => {

    function focusOnName() {
        setTimeout(() => {
            $('#name').focus();
        }, 500);
    }

    return {
        focusOnName: focusOnName
    }
})(jQuery);