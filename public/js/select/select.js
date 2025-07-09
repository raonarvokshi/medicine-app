// Inicializo Select2
$('#doctorSelect').select2({
    dropdownParent: $('#addAppointmentModal'), // Shfaqet korrekt brenda modalit
    placeholder: "Zgjedh doktorin",
    width: '100%'
});

$('#patientSelect').select2({
    dropdownParent: $('#addAppointmentModal'),
    placeholder: "Zgjedh pacientin",
    width: '100%'
});

// Inicializo Select2 për modalin e editimit
$('#edit-doctor').select2({
    dropdownParent: $('#editAppointmentModal'),
    placeholder: "Zgjedh doktorin",
    width: '100%'
});

$('#edit-patient').select2({
    dropdownParent: $('#editAppointmentModal'),
    placeholder: "Zgjedh pacientin",
    width: '100%'
});