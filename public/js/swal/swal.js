document.addEventListener('DOMContentLoaded', function () {
    const appointmentURLParams = new URLSearchParams(window.location.search);
    const addedAppointment = appointmentURLParams.get("added");
    const updatedAppointment = appointmentURLParams.get("updated");
    const deletedApppintment = appointmentURLParams.get("deleted");

    if (addedAppointment === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Termini u caktua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (updatedAppointment === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Termini u perditsua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Hiqe query param nga URL pas mbylljes
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (deletedApppintment === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Termini u fshi me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Hiqe query param nga URL pas mbylljes
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    }

    const locationURLParams = new URLSearchParams(window.location.search);
    const locationAdded = locationURLParams.get("added");
    const locationUpdated = locationURLParams.get("updated");
    const locationDeleted = urlParams.get("deleted");

    if (locationAdded === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Njesia organizative u shtua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Hiqe query param nga URL pas mbylljes
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (locationUpdated === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Njesia organizative u perditsua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Hiqe query param nga URL pas mbylljes
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (locationDeleted === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Njesia organizative u fshi me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Hiqe query param nga URL pas mbylljes
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    }
});