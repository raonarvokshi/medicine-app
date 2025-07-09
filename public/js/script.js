// dark-mode.js
const table = document.querySelector('#patientsTable');

// Check saved preference from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('.switch input').checked = true;
}

// Toggle logic
const themeSwitch = document.querySelector('.switch input');
themeSwitch.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

$("#add-doc__form").on("submit", function (e) {
    const name = $("#name").val().trim();
    const department = $("#department").val().trim();
    const phone = $("#phone-number").val().trim();
    const email = $("#email").val().trim();

    if (!name || !department || !phone || !email) {
        e.preventDefault(); // ndal submit
        const errorMsg = $(".error-msg");
        errorMsg.text("Të lutem plotëso të gjitha fushat").fadeIn();

        setTimeout(() => {
            errorMsg.fadeOut("slow");
        }, 5000);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
});


$("#add-patient__form").on("submit", function (e) {
    e.preventDefault(); // ndalojmë submit për verifikim

    const form = e.target;

    const fName = form.fName.value.trim();
    const parentsName = form.parentsName.value.trim();
    const lName = form.lName.value.trim();
    const email = form.email.value.trim();
    const gender = form.gender.value;
    const personalNum = form.personalNum.value.trim();
    const birthday = form.birthday.value.trim();
    const ageType = form.ageType.value;
    const city = form.city.value.trim();
    const address = form.address.value.trim();
    const comment = form.comment.value.trim();
    const insurance = form.insurance.value;

    if (
        !fName ||
        !parentsName ||
        !lName ||
        !email ||
        !gender ||
        !personalNum ||
        !birthday ||
        !ageType ||
        !city ||
        !address ||
        !insurance
    ) {
        $(".error-msg").text("Të lutem plotëso të gjitha fushat").fadeIn();

        setTimeout(() => {
            $(".error-msg").fadeOut("slow");
        }, 5000);
        return;
    }

    // Nëse çdo gjë është në rregull, e lejojmë formën të vazhdojë
    this.submit();
});

$("#add-ref__form").on("submit", function (e) {
    const form = e.target;

    const fullName = form.fullName.value.trim();
    const department = form.department.value.trim();
    const phoneNumber = form.phoneNumber.value.trim();
    const email = form.email.value.trim();

    if (!fullName || !department || !phoneNumber || !email) {
        e.preventDefault(); // ndalon submit-in

        const errorMsg = $(form).find(".error-msg");
        errorMsg.text("Të gjitha fushat janë të detyrueshme.").fadeIn();

        setTimeout(() => {
            errorMsg.fadeOut("slow");
        }, 5000);

        return false;
    }

    return true; // vazhdon submit nëse çdo gjë është ok
});

$("#add-location__form").on("submit", function (e) {
    const form = e.target;

    const name = form.name.value.trim();

    if (!name) {
        e.preventDefault(); // ndalon submit-in

        const errorMsg = $(form).find(".error-msg");
        errorMsg.text("Te lutem shenoje emrin e njesis organizative!").fadeIn();

        setTimeout(() => {
            errorMsg.fadeOut("slow");
        }, 5000);

        return false;
    }

    return true; // vazhdon submit nëse çdo gjë është ok
});