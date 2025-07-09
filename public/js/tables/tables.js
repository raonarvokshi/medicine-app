$(document).ready(() => {
    $('#appointmentsTable').DataTable({
        responsive: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/sq.json'
        },
        dom: 'Bfrtip',
        pageLength: 5,
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fas fa-file-excel"></i>',
                className: 'btn btn-success me-2 mb-4'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fas fa-file-pdf"></i>',
                className: 'btn btn-danger me-2 mb-4'
            },
            {
                extend: 'print',
                text: '<i class="fas fa-print"></i>',
                className: 'btn btn-secondary mb-4'
            }
        ]
    });

    setTimeout(() => {
        $('.dt-button').removeClass('dt-button');
    }, 100);
});