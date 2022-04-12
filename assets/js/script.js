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
            // if the Abstract API detects a type in the submission, it will provide an autocorrect solution,
            // which will be provided as a recommendation to the user through a sweetalert.js notification
            if (data.autocorrect != "") {
                console.log(data.autocorrect);
                swal("Error", "There was a typo detected. Maybe you meant" + data.autocorrect);
                return;
            // if the Abstract API detects the submission was in an invalid email format,
            // this check will prompt the user to try again through a sweetalert.js notification
            } else if (data.is_valid_format == false) {
                swal("Error", "The email entered was not in a valid format. Please try again.");
                return;
            };
            // if the checks where passed, the following code creates variables for the data retreived from the
            // API request, creates h4 elements and assigns them classes as well as the corresponding data, and
            // finally appends each one to the '#output' section of the html doc
            var email = data.email;
            var deliverability = data.deliverability;
            var qualityScore = data.quality_score;
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

// This function is a representation of the getAbstractData fxn but will not query the API, 
// thereby saving available monthly requests when testing
function getAbstractDataNoQuery() {

            var outputEl = $('#output');
            var emailInput = $('<h4>');
            emailInput.text('Email: jkwalsh127@gmail.com');
            emailInput.attr('class', 'data-output')
            var deliverabilityOutput = $('<h4>');
            deliverabilityOutput.text('Deliverability: DELIVERABLE');
            deliverabilityOutput.attr('class', 'data-output')
            var qualityScoreOutput = $('<h4>');
            qualityScoreOutput.text('Quality score: 0.70');
            qualityScoreOutput.attr('class', 'data-output')
            var isFreeEmail = $('<h4>');
            isFreeEmail.text("From Abstract's list of free email providers: TRUE");
            isFreeEmail.attr('class', 'data-output')
            var isDisposableEmail = $('<h4>');
            isDisposableEmail.text("From Abstract's list of disposable email providers: FALSE");
            isDisposableEmail.attr('class', 'data-output')
            var isRoleEmail = $('<h4>');
            isRoleEmail.text("Email for role rather than individual: FALSE");
            isRoleEmail.attr('class', 'data-output')
            var isCatchallEmail = $('<h4>');
            isCatchallEmail.text("Email is a catchall for its domain: FALSE");
            isCatchallEmail.attr('class', 'data-output')
            var isSmtpValid = $('<h4>');
            isSmtpValid.text("Email SMTP check: TRUE");
            isSmtpValid.attr('class', 'data-output')

            outputEl.append(emailInput);
            outputEl.append(deliverabilityOutput);
            outputEl.append(qualityScoreOutput);
            outputEl.append(isFreeEmail);
            outputEl.append(isDisposableEmail);
            outputEl.append(isRoleEmail);
            outputEl.append(isCatchallEmail);
            outputEl.append(isSmtpValid);
};

getAbstractDataNoQuery();