// TERMINET
// Edit Termin
$('.edit-appointment-btn').on('click', function () {
    const id = $(this).data('id');
    const doctorId = $(this).data('doctor');
    const patientId = $(this).data('patient');
    const date = $(this).data('date');
    const time = $(this).data('time');
    const status = $(this).data('status');

    $('#edit-id').val(id);
    $('#edit-doctor').val(doctorId).trigger('change');
    $('#edit-patient').val(patientId).trigger('change');
    $('#edit-date').val(date);
    $('#edit-time').val(time);
    $('#edit-status').val(status);

    $('#editAppointmentModal').modal('show');
});

// Delete Termin
$('.delete-appointment-btn').on('click', function () {
    const id = $(this).data('id');

    $('#delete-id').val(id);
    $('#deleteAppointmentModal').modal('show');
});



// NJESIA ORGANIZATIVE
$('.edit-location-btn').on('click', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    $('#edit-id').val(id);
    $('#edit-name').val(name);

    $('#editLocationModal').modal('show');
});

// Kur klikohet butoni për fshirje
$('.delete-location-btn').on('click', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    $('#delete-id').val(id);
    $('#delete-name').text(name);

    $('#deleteLocationModal').modal('show');
});



// REFERUESIT
// Shfaq modalin dhe mbush të dhënat kur klikohet edit
$('.edit-ref-btn').on('click', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const department = $(this).data('department');
    const tel = $(this).data('tel');
    const email = $(this).data('email');

    $('#edit-id').val(id);
    $('#edit-name').val(name);
    $('#edit-department').val(department);
    $('#edit-tel').val(tel);
    $('#edit-email').val(email);

    $('#editRefModal').modal('show');
});

// Kur klikohet butoni për fshirje
$('.delete-ref-btn').on('click', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    $('#delete-id').val(id);
    $('#delete-name').text(name);

    $('#deleteRefModal').modal('show');
});