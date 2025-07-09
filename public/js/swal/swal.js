document.addEventListener('DOMContentLoaded', function () {
    // APPOINTMENTS
    const appointmentURLParams = new URLSearchParams(window.location.search);
    const addedAppointment = appointmentURLParams.get("appointmentAdded");
    const updatedAppointment = appointmentURLParams.get("appointmentUpdated");
    const deletedApppintment = appointmentURLParams.get("appointmentDeleted");

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


    // NJESIA ORGANIZATIVE
    const locationURLParams = new URLSearchParams(window.location.search);
    const locationAdded = locationURLParams.get("locationAdded");
    const locationUpdated = locationURLParams.get("locationUpdated");
    const locationDeleted = locationURLParams.get("locationDeleted");

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

    // REFERUESIT
    const refURLParams = new URLSearchParams(window.location.search);
    const refAdded = refURLParams.get("refAdded");
    const refUpdated = refURLParams.get("refUpdated");
    const refDeleted = refURLParams.get("refDeleted");

    if (refAdded === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Referuesi u shtua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Pas klikimit OK, hiqe query param nga URL
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (refUpdated === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Referuesi u perditsua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Pas klikimit OK, hiqe query param nga URL
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (refDeleted === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Referuesi u fshi me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Pas klikimit OK, hiqe query param nga URL
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    }


    // PACIENTAT
    const urlParams = new URLSearchParams(window.location.search);
    const patientAdded = urlParams.get("patientAdded");
    const patientUpdated = urlParams.get("patientUpdated");
    const patientDeleted = urlParams.get("patientDeleted");

    if (patientAdded === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Pacienti u shtua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Pas klikimit OK, hiqe query param nga URL
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (patientUpdated === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Pacienti u perditsua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Hiqe query param nga URL pas mbylljes
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (patientDeleted === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Pacienti u fshi me sukses.',
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



    // DOKTORAT
    const doctorURLParams = new URLSearchParams(window.location.search);
    const doctorAdded = doctorURLParams.get("doctorAdded");
    const doctorUpdated = doctorURLParams.get("doctorUpdated");
    const doctorDeleted = doctorURLParams.get("doctorDeleted");

    if (doctorAdded === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Doktori u shtua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (doctorUpdated === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Doktori u perditsua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Hiqe query param nga URL pas mbylljes
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (doctorDeleted === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Doktori u fshi me sukses.',
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



    // DOKTORAT
    const docSchedParams = new URLSearchParams(window.location.search);
    const docSchedAdded = docSchedParams.get("docSchedAdded");
    const docSchedUpdated = docSchedParams.get("docSchedUpdated");
    const docSchedDeleted = docSchedParams.get("docSchedDeleted");

    if (docSchedAdded === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Orari i doktorit u shtua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (docSchedUpdated === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Orari i doktorit u perditsua me sukses.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500,
            timerProgressBar: true,
        }).then(() => {
            // Hiqe query param nga URL pas mbylljes
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        });
    } else if (docSchedDeleted === "true") {
        Swal.fire({
            icon: 'success',
            title: 'Sukses!',
            text: 'Orari i doktorit u fshi me sukses.',
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