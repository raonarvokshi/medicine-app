// ==============================
// Select2 - Modal Shto Appointment
// ==============================
if ($('#addAppointmentModal').length) {
    $('#doctorSelect').select2({
        dropdownParent: $('#addAppointmentModal'),
        placeholder: "Zgjedh doktorin",
        width: '100%'
    });

    $('#patientSelect').select2({
        dropdownParent: $('#addAppointmentModal'),
        placeholder: "Zgjedh pacientin",
        width: '100%'
    });
}

// ==============================
// Select2 - Modal Edit Appointment
// ==============================
if ($('#editAppointmentModal').length) {
    const $editModal = $('#editAppointmentModal');

    if ($('#edit-doctor').closest($editModal).length) {
        $('#edit-doctor').select2({
            dropdownParent: $editModal,
            placeholder: "Zgjedh doktorin",
            width: '100%'
        });
    }

    if ($('#edit-patient').closest($editModal).length) {
        $('#edit-patient').select2({
            dropdownParent: $editModal,
            placeholder: "Zgjedh pacientin",
            width: '100%'
        });
    }
}

// ==============================
// Select2 - Modal Shto Orar (Schedule)
// ==============================
if ($('#addScheduleModal').length) {
    $('#doctor-select').select2({
        dropdownParent: $('#addScheduleModal'),
        placeholder: "Zgjedh doktorin",
        width: '100%'
    });

    $('#location-select').select2({
        dropdownParent: $('#addScheduleModal'),
        placeholder: "Zgjedh njësinë organizative",
        width: '100%'
    });
}

// ==============================
// Select2 - Modal Edito Orar (Schedule)
// ==============================
if ($('#editScheduleModal').length) {
    const $editScheduleModal = $('#editScheduleModal');

    if ($('#edit-doctor').closest($editScheduleModal).length) {
        $('#edit-doctor').select2({
            dropdownParent: $editScheduleModal,
            placeholder: "Zgjedh doktorin",
            width: '100%'
        });
    }

    if ($('#edit-location').closest($editScheduleModal).length) {
        $('#edit-location').select2({
            dropdownParent: $editScheduleModal,
            placeholder: "Zgjedh njësinë organizative",
            width: '100%'
        });
    }
}
