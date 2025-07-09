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