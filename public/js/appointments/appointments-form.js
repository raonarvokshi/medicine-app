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
