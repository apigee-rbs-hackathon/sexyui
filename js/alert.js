// Reusable alerting function.  Set the message and then the level of alert (success, info, danger, warning)

function createAlert(message, level) {
  $('#alerts').append('<div class="alert alert-' + level + ' fade in alertDiv col-md-12">' +
        '<button type="button" class="close" data-dismiss="alert">' +
        '&times;</button>' + message + '</div>');
}
