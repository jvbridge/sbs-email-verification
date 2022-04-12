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

            // $('#email-input').text(email);
            // $('#deliverability-output').text(deliverability);
            // $('#quality-score-output').text('Quality score: ' + qualityScore);
            // $('#is-free-email').text("From Abstract's list of free email providers: " + isFreeEmailString);
            // $('#is-disposable-email').text("From Abstract's list of disposable email providers: " + isDisposableEmailString);
            // $('#is-role-email').text("Email for role rather than individual: " + isRoleEmailString);
            // $('#is-catchall-email').text("Email is a catchall for its domain: " +isCatchallEmailString);
            // $('#is-smtp-valid').text("Email SMTP check: " + isSmtpValidString);

            var outputEl = $('#output');
            var emailInput = $('<h4>');
            emailInput.text('Email: ' + email);
            emailInput.attr('class', 'data-output')
            var deliverabilityOutput = $('<h4>');
            deliverabilityOutput.text('Deliverability: ' + deliverability);
            deliverabilityOutput.attr('class', 'data-output')
            var qualityScoreOutput = $('<h4>');
            qualityScoreOutput.text('Quality score: ' + qualityScore);
            qualityScoreOutput.attr('class', 'data-output')
            var isFreeEmail = $('<h4>');
            isFreeEmail.text("From Abstract's list of free email providers: " + isFreeEmailString);
            isFreeEmail.attr('class', 'data-output')
            var isDisposableEmail = $('<h4>');
            isDisposableEmail.text("From Abstract's list of disposable email providers: " + isDisposableEmailString);
            isDisposableEmail.attr('class', 'data-output')
            var isRoleEmail = $('<h4>');
            isRoleEmail.text("Email for role rather than individual: " + isRoleEmailString);
            isRoleEmail.attr('class', 'data-output')
            var isCatchallEmail = $('<h4>');
            isCatchallEmail.text("Email is a catchall for its domain: " +isCatchallEmailString);
            isCatchallEmail.attr('class', 'data-output')
            var isSmtpValid = $('<h4>');
            isSmtpValid.text("Email SMTP check: " + isSmtpValidString);
            isSmtpValid.attr('class', 'data-output')

            outputEl.append(emailInput);
            outputEl.append(deliverabilityOutput);
            outputEl.append(qualityScoreOutput);
            outputEl.append(isFreeEmail);
            outputEl.append(isDisposableEmail);
            outputEl.append(isRoleEmail);
            outputEl.append(isCatchallEmail);
            outputEl.append(isSmtpValid);
        });
};

getAbstractData();