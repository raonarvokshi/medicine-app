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



// Inicializo Select2
$('#doctor-select').select2({
    dropdownParent: $('#addScheduleModal'), // ose emri i modalit ku ndodhet select-i
    placeholder: "Zgjedh doktorin",
    width: '100%'
});

$('#location-select').select2({
    dropdownParent: $('#addScheduleModal'),
    placeholder: "Zgjedh njesin organizative",
    width: '100%',
});

// Inicializo Select2 për modalin e editimit
$('#edit-doctor').select2({
    dropdownParent: $('#editScheduleModal'),
    placeholder: "Zgjedh doktorin",
    width: '100%'
});

$('#edit-location').select2({
    dropdownParent: $('#editScheduleModal'),
    placeholder: "Zgjedh pacientin",
    width: '100%',
});