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



// PACIENTAT
$('.view-patient-btn').click(function () {
    const data = $(this).data();
    $('#modal-first').text(data.first);
    $('#modal-parent').text(data.parent);
    $('#modal-last').text(data.last);
    $('#modal-gender').text(data.gender === 'm' ? 'Mashkull' : 'Femër');
    $('#modal-email').text(data.email);
    $('#modal-birthday').text(new Date(data.birthday).toLocaleDateString('en-GB'));
    $('#modal-age-type').text(translateAgeType(data.ageType));
    $('#modal-personalnum').text(data.personalnum);
    $('#modal-city').text(data.city);
    $('#modal-address').text(data.address);
    $('#modal-insurance').text(data.insurance === 'hasInsurance' ? 'Ka sigurim' : 'S\'ka sigurim');
    $('#modal-comment').text(data.comment || 'S\'ka koment');
    if (data.updated) {
        const updatedDate = new Date(data.updated);
        const date = updatedDate.toLocaleDateString('en-GB');
        const time = updatedDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        $('#modal-updated').text(`${date} ${time}`);
    } else {
        $('#modal-updated').text('Nuk është përditësuar ndonjëherë');
    }

    $('#viewPatientModal').modal('show');
});

$('.edit-patient-btn').click(function () {
    const data = $(this).data();
    $('#edit-id').val(data.id);
    $('#fName').val(data.first);
    $('#parentsName').val(data.parent);
    $('#lName').val(data.last);
    $('#gender').val(data.gender);
    $('#email').val(data.email);

    const birthday = new Date(data.birthday);
    const day = String(birthday.getDate()).padStart(2, '0');
    const month = String(birthday.getMonth() + 1).padStart(2, '0'); // muajt fillojnë nga 0
    const year = birthday.getFullYear();
    const formattedBirthday = `${year}-${month}-${day}`; // yyyy-mm-dd për input[type=date]
    $('#birthday').val(formattedBirthday);



    $('#ageType').val(data.ageType);
    $('#personalNum').val(data.personalnum);
    $('#city').val(data.city);
    $('#address').val(data.address);
    $('#comment').val(data.comment);
    $('#insurance').val(data.insurance);
    $('#editPatientModal').modal('show');
});


$('.delete-patient-btn').click(function () {
    const data = $(this).data();
    $('#delete-id').val(data.id);
    $('#delete-fullname').text(`${data.first} ${data.parent} ${data.last}`);
    $('#deletePatientModal').modal('show');
});

function translateAgeType(type) {
    switch (type) {
        case 'years': return 'Vjet';
        case 'months': return 'Muaj';
        case 'weeks': return 'Javë';
        case 'days': return 'Ditë';
        case 'hours': return 'Orë';
        default: return type;
    }
}



// DOKTORAT
$('.edit-doctor-btn').on('click', function () {
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

    $('#editDoctorModal').modal('show');
});

$('.delete-doctor-btn').on('click', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    $('#delete-id').val(id);
    $('#delete-name').text(name);

    $('#deleteDoctorModal').modal('show');
});




// DOC SCHEDULE
// Shfaq Oraret - Modal Info
$('.view-hours-btn').on('click', function () {
    const doctorName = $(this).data('doctor');
    const hours = $(this).data('hours');
    const orderedDays = [
        "E Hënë", "E Martë", "E Mërkurë", "E Enjte",
        "E Premte", "E Shtunë", "E Diel"
    ];

    $('#modal-doctor-name').text(doctorName);
    const $list = $('#modal-hours-list');
    $list.empty();

    orderedDays.forEach(day => {
        const dayData = hours[day];
        let content = "";

        if (dayData && dayData.start && dayData.end) {
            content = `${dayData.start} - ${dayData.end}`;
        } else {
            content = `<span class="not-working__text">Nuk gjendet në pune</span>`;
        }

        const li = `
        <li class="list-group-item d-flex justify-content-between">
          <span><strong>${day}</strong></span>
          <span>${content}</span>
        </li>`;
        $list.append(li);
    });

    $('#viewHoursModal').modal('show');
});

// Edit Orari
$('.edit-schedule-btn').on('click', function () {
    const id = $(this).data('id');
    const doctorId = $(this).data('doctor');
    const locationId = $(this).data('location');
    const visitDuration = $(this).data('visit-duration');
    const hours = $(this).data('weekday-hours');

    $('#edit-id').val(id);
    $('#edit-doctor').val(doctorId).trigger('change');
    $('#edit-location').val(locationId).trigger('change');
    $('#edit-visit-duration').val(visitDuration);

    // vendos oraret ne input fields sipas ditëve
    const days = ["E Hënë", "E Martë", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë", "E Diel"];
    days.forEach(day => {
        if (hours[day]) {
            $(`input.edit-time-start[data-day="${day}"]`).val(hours[day].start);
            $(`input.edit-time-end[data-day="${day}"]`).val(hours[day].end);
        } else {
            $(`input.edit-time-start[data-day="${day}"]`).val('');
            $(`input.edit-time-end[data-day="${day}"]`).val('');
        }
    });

    $('#editScheduleModal').modal('show');
});


// Delete Orari
$('.delete-schedule-btn').on('click', function () {
    const id = $(this).data('id');
    $('#delete-id').val(id);
    $('#deleteScheduleModal').modal('show');
});