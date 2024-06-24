$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var employeeNumber = urlParams.get('id');
    if (employeeNumber) {
        $.ajax({
            url: 'https://kerbau.odaje.biz/getstaffbyid.php?id=' + employeeNumber,
            dataType: 'json',
            success: function(data) {
                if (data && data.length > 0 && JSON.parse(data[0]).status === 1) {
                    var staff = JSON.parse(data[1]);
                    var detailsHtml = '<ul class="details-list">' +
                        '<li><strong>Employee Number:</strong> ' + staff.employeeNumber + '</li>' +
                        '<li><strong>Name:</strong> ' + staff.firstName + ' ' + staff.lastName + '</li>' +
                        '<li><strong>Email:</strong> ' + staff.email + '</li>' +
                        '<li><strong>Office Code:</strong> ' + staff.officeCode + '</li>' +
                        '<li><strong>Extension:</strong> ' + staff.extension + '</li>' +
                        '<li><strong>Job Title:</strong> ' + staff.jobTitle + '</li>';
                    if (staff.reportsTo) {
                        detailsHtml += '<li><strong>Reports To:</strong> ' + staff.reportsTo + '</li>';
                    }
                    detailsHtml += '</ul>';
                    $('#staffDetails').html(detailsHtml);
                } else {
                    $('#staffDetails').html('<p class="error-message">No data found for employee number ' + employeeNumber + '.</p>');
                }
            },
            error: function() {
                $('#staffDetails').html('<p class="error-message">Error retrieving staff details.</p>');
            }
        });
    } else {
        $('#staffDetails').html('<p class="error-message">Employee number not provided.</p>');
    }
});
