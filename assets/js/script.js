/**
 * @param {string} userInput - default email to avoid unnecessary api queries
 */
var userInput = 'jkwalsh127@gmail.com';
/**
 *  @param {string} key - api key for Abstract
 */
var key = 'b27bbe70118d43f5aa1bce1a9262ef17';

/**
 * @param {function} getAbstractData - makes the request to the Abstract API, stores data as object, and ppends data to html doc
 */
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
            var abstractOutput = {
                email: data.email,
                deliverability: data.deliverability,
                qualityScore: data.quality_score,
                isFreeEmailBoolean: data.is_free_email.value,
                isFreeEmailString: data.is_free_email.text,
                isDisposableEmailBoolean: data.is_disposable_email.value,
                isDisposableEmailString: data.is_disposable_email.text,
                isRoleEmailBoolean: data.is_role_email.value,
                isRoleEmailString: data.is_role_email.text,
                isCatchallEmailBoolean: data.is_catchall_email.value,
                isCatchallEmailString: data.is_catchall_email.text,
                isSmtpValidBoolean: data.is_smtp_valid.value,
                isSmtpValidString: data.is_smtp_valid.text,
            }


            var outputEl = $('#output');
            var emailInput = $('<h4>');
            emailInput.text('Email: ' + abstractOutput.email);
            emailInput.attr('class', 'data-output')
            var deliverabilityOutput = $('<h4>');
            deliverabilityOutput.text('Deliverability: ' + abstractOutput.deliverability);
            deliverabilityOutput.attr('class', 'data-output')
            var qualityScoreOutput = $('<h4>');
            qualityScoreOutput.text('Quality score: ' + abstractOutput.qualityScore);
            qualityScoreOutput.attr('class', 'data-output')
            var isFreeEmail = $('<h4>');
            isFreeEmail.text("From Abstract's list of free email providers: " + abstractOutput.isFreeEmailString);
            isFreeEmail.attr('class', 'data-output')
            var isDisposableEmail = $('<h4>');
            isDisposableEmail.text("From Abstract's list of disposable email providers: " + abstractOutput.isDisposableEmailString);
            isDisposableEmail.attr('class', 'data-output')
            var isRoleEmail = $('<h4>');
            isRoleEmail.text("Email for role rather than individual: " + abstractOutput.isRoleEmailString);
            isRoleEmail.attr('class', 'data-output')
            var isCatchallEmail = $('<h4>');
            isCatchallEmail.text("Email is a catchall for its domain: " + abstractOutput.isCatchallEmailString);
            isCatchallEmail.attr('class', 'data-output')
            var isSmtpValid = $('<h4>');
            isSmtpValid.text("Email SMTP check: " + abstractOutput.isSmtpValidString);
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

/**
 * @param {function} getAbstractDataNoQuery - this is a copy of the getAbstractData fxn that will append dummy output to html doc, thereby avoiding unnecessary queries during testing
 */
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