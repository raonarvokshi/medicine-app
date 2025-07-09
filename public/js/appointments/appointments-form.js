$(document).ready(function () {
    // Kur zgjedhet doktori
    $('#doctorSelect').on('change', function () {
        const doctorId = $(this).val();
        if (!doctorId) return;

        // Ngarko datat valide për doktorin
        $.ajax({
            url: `/doctor-available-dates/${doctorId}`,
            method: 'GET',
            success: function (res) {
                if (res.success) {
                    $('#datepicker').datepicker("destroy");
                    const validDays = res.validDays;
                    const allowedDays = validDays.map(d => {
                        const map = {
                            "E Hënë": 1,
                            "E Martë": 2,
                            "E Mërkurë": 3,
                            "E Enjte": 4,
                            "E Premte": 5,
                            "E Shtunë": 6,
                            "E Diel": 0
                        };
                        return map[d];
                    });

                    $('#datepicker').datepicker({
                        dateFormat: "yy-mm-dd",
                        beforeShowDay: function (date) {
                            return [allowedDays.includes(date.getDay())];
                        },
                        onSelect: function (dateText) {
                            // pasi zgjidhet data, mer oraret
                            $.ajax({
                                url: `/doctor-available-times/${doctorId}/${dateText}`,
                                method: 'GET',
                                success: function (res) {
                                    if (res.success) {
                                        let timeOptions = '';
                                        res.times.forEach(time => {
                                            timeOptions += `<option value="${time}">${time}</option>`;
                                        });
                                        $('.js-time-picker').html(timeOptions).prop('disabled', false);
                                    } else {
                                        $('.js-time-picker').html('<option value="">Nuk ka orare</option>').prop('disabled', true);
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });
    });
});

$(function () {

    /* ==========================================================
       FUNKSION PËR TA INICIALIZUAR LOGJIKËN
       (përdoret si për ADD ashtu edhe për EDIT)
    ========================================================== */
    function initDoctorSchedule(config) {
        const $doctor = $(config.doctorSel);
        const $dateIn = $(config.dateSel);
        const $timeSel = $(config.timeSel);
        let currentDoctor = null;

        // Kur ndryshon doktori ------------------------------
        $doctor.on('change', function () {
            currentDoctor = $(this).val();
            if (!currentDoctor) return;

            // reset datën & orën
            $dateIn.val('');
            $timeSel.html('<option value="">Zgjedh orarin</option>').prop('disabled', true);

            $.get(`/doctor-available-dates/${currentDoctor}`, res => {
                if (!res.success) return;

                const allowedDays = res.validDays.map(d => ({
                    "E Hënë": 1, "E Martë": 2, "E Mërkurë": 3,
                    "E Enjte": 4, "E Premte": 5, "E Shtunë": 6, "E Diel": 0
                }[d]));

                // (Ri)-krijo datepicker-in
                $dateIn.datepicker('destroy').datepicker({
                    dateFormat: "yy-mm-dd",
                    beforeShowDay: d => [allowedDays.includes(d.getDay())],
                    onSelect: loadTimes
                });
            });
        });

        /*  Ngarko orët sapo zgjidhet data  */
        function loadTimes(dateText) {
            if (!currentDoctor) return;
            $.get(`/doctor-available-times/${currentDoctor}/${dateText}`, res => {
                if (!res.success) {
                    $timeSel.html('<option value="">Nuk ka orare</option>').prop('disabled', true);
                    return;
                }
                const opts = res.times.map(t => `<option value="${t}">${t}</option>`).join('');
                $timeSel.html(opts).prop('disabled', false);

                // nëse kemi already një orë të paracaktuar (rast EDIT) – e selektojmë:
                if (config.preTime) $timeSel.val(config.preTime);
            });
        }

        // Në rast EDIT – në momentin që modali hapet,
        // fusim vlerat ekzistuese dhe thërrasim manualisht loadTimes
        if (config.preDate) {
            $doctor.trigger('change');               // ngarkon datepicker
            $dateIn.val(config.preDate);             // vendos datën ekzistuese
            // pas pak ms (pasi datepicker u inicializua) thirre loadTimes:
            setTimeout(() => loadTimes(config.preDate), 200);
        }
    }

    /* ==========================================================
       1) INITIALIZO PËR MODALIN ADD
    ========================================================== */
    initDoctorSchedule({
        doctorSel: '#doctorSelect',
        dateSel: '#datepicker',
        timeSel: '.js-time-picker'
    });

    /* ==========================================================
       2) INITIALIZO PËR MODALIN EDIT
          – kur klikojmë butonin .edit-appointment-btn
          – vlerat paraprake merren nga data-attributes
    ========================================================== */
    $('.edit-appointment-btn').on('click', function () {
        const $btn = $(this);

        // paraplotëso fushat (kishit këtë logjikë diku tjetër – ruajeni)
        $('#edit-id').val($btn.data('id'));
        $('#edit-doctor').val($btn.data('doctor')).trigger('change');
        $('#edit-patient').val($btn.data('patient')).trigger('change');
        $('#edit-status').val($btn.data('status'));

        // INITIALIZO LOGJIKËN E ORAREVE ME VLERAT EKZISTUESE
        initDoctorSchedule({
            doctorSel: '#edit-doctor',
            dateSel: '#edit-datepicker',
            timeSel: '.js-edit-time-picker',
            preDate: $btn.data('date'),   // p.sh. "2025-07-10"
            preTime: $btn.data('time')    // p.sh. "09:15"
        });

        $('#editAppointmentModal').modal('show');
    });

});
