$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        showAnim: "slideDown"
    });
});

new Picker(document.querySelector('.js-time-picker'), {
    format: 'HH:mm',
    headers: true,
    text: {
        title: 'Pick a time',
    },
});