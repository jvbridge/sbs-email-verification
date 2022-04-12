var userInput = 'jkwalsh127@gmail.com';
var key = 'b27bbe70118d43f5aa1bce1a9262ef17';

// This function will make the request to the Abstract API
function getAbstractData() {
    // Fetch data from the appropriate URL, applying the neccesasry API key and
    // user-submitted email as the variables key and userInput, respectively
    var requestUrl = 'https://emailvalidation.abstractapi.com/v1/?api_key=' + key + '&email=' + userInput;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var email = data.email;
            var autocorrect = data.autocorrect;
            var deliverability = data.deliverability;
            var qualityScore = data.quality_score;
            var isValidFormatBoolean = data.is_valid_format.value;
            var isValidFormatString = data.is_valid_format.text;
            var isFreeEmailBoolean = data.is_free_email.value;
            var isFreeEmailString = data.is_free_email.text;
            var isDisposableEmailBoolean = data.is_disposable_email.value;
            var isDisposableEmailString = data.is_disposable_email.text;
            var isRoleEmailBoolean = data.is_role_email.value;
            var isRoleEmailString = data.is_role_email.text;
            var isCatchallEmailBoolean = data.is_catchall_email.value;
            var isCatchallEmailString = data.is_catchall_email.text;
            var isSmtpValidBoolean = data.is_smtp_valid.value;
            var isSmtpValidString = data.is_smtp_valid.text;

            $('#email-input').text('Email' + email);
            $('#deliverability-output').text('Deliverability: ' + deliverability);
            $('#quality-score-output').text('Quality score: ' + qualityScore);
            $('#is-free-email').text("From Abstract's list of free email providers: " + isFreeEmailString);
            $('#is-disposable-email').text("From Abstract's list of disposable email providers: " + isDisposableEmailString);
            $('#is-role-email').text("Email for role rather than individual: " + isRoleEmailString);
            $('#is-catchall-email').text("Email is a catchall for its domain: " +isCatchallEmailString);
            $('#is-smtp-valid').text("Email SMTP check: " + isSmtpValidString);
        });
};