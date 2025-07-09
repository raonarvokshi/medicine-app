$(function () {
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        showAnim: "slideDown"
    });
});

const allTimeInputs = document.querySelectorAll(".time-picker");

allTimeInputs.forEach(input => {
    new Picker(input, {
        format: 'HH:mm',
        headers: true,
        text: {
            title: 'Zgjedh oren',
        },
    });
});