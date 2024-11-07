export const spinner = () => {
    setTimeout(() => {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 100);
};