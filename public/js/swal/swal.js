document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const added = urlParams.get("added");
    const updated = urlParams.get("updated");
    const deleted = urlParams.get("deleted");

    if (added === "true") {
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
    } else if (updated === "true") {
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
    } else if (deleted === "true") {
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
});