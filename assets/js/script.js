/**
 * @type {string} a refrence to the abstract API URL
 */
const abstractApiUrl ="https://emailvalidation.abstractapi.com/v1/";
/**
 * @type {string} userInput - default email to avoid unnecessary api queries
 */
var userInput = 'jkwalsh127@gmail.com';
/**
 *  @type {string} key - api key for Abstract
 */
var key = 'b27bbe70118d43f5aa1bce1a9262ef17';

/**
 * Makes the request to the Abstract API, stores data as object, and appends the
 * data to the DOM
 */
function getAbstractData() {
    // Fetch data from the appropriate URL, applying the neccesasry API key and
    // user-submitted email as the variables key and userInput, respectively
    var requestUrl = abstractApiUrl  + "?api_key=" + key + '&email=' + userInput;

    // main fetch
    fetch(requestUrl)
        .then(function (response) {
            // simply return the response of the server to the next promise
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // check if the abstract API detects a typo in the submission
            if (data.autocorrect != "") {
                console.log(data.autocorrect);
                // sweetalert.js notification of the problem with a solution
                swal("Error", "There was a typo detected. Maybe you meant" + data.autocorrect);
                return;
            }

            // check if it's an invalid email format
            if (data.is_valid_format == false) {
                // promt the user about the problem with sweetalert.js
                swal("Error", "The email entered was not in a valid format. Please try again.");
                return;
            }

            // checks were passed, make an object with all the relevant data
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
                isSmtpValidString: data.is_smtp_valid.text
            };

            // get a refrence to the output element to put the data on
            var outputEl = $('#output');

            // create an element to display the email
            var emailInput = $('<h4>');
            emailInput.text('Email: ' + abstractOutput.email);
            emailInput.attr('class', 'data-output');

            // create an element to show if the email is deliverable to
            var deliverabilityOutput = $('<h4>');
            deliverabilityOutput.text('Deliverability: ' + abstractOutput.deliverability);
            deliverabilityOutput.attr('class', 'data-output');

            // create an element to show the quality score
            var qualityScoreOutput = $('<h4>');
            qualityScoreOutput.text('Quality score: ' + abstractOutput.qualityScore);
            qualityScoreOutput.attr('class', 'data-output');

            // create an element to show if it's a free email
            var isFreeEmail = $('<h4>');
            isFreeEmail.text("From Abstract's list of free email providers: " + abstractOutput.isFreeEmailString);
            isFreeEmail.attr('class', 'data-output');

            // create an element to show if it's a disposable email
            var isDisposableEmail = $('<h4>');
            isDisposableEmail.text("From Abstract's list of disposable email providers: " + abstractOutput.isDisposableEmailString);
            isDisposableEmail.attr('class', 'data-output');

            // create an element to show if the email is a person or a role
            var isRoleEmail = $('<h4>');
            isRoleEmail.text("Email for role rather than individual: " + abstractOutput.isRoleEmailString);
            isRoleEmail.attr('class', 'data-output');

            // create an element to show if the email is a "catch all" one for its domain
            var isCatchallEmail = $('<h4>');
            isCatchallEmail.text("Email is a catchall for its domain: " + abstractOutput.isCatchallEmailString);
            isCatchallEmail.attr('class', 'data-output');

            // create an element to show if the email has SMTP
            var isSmtpValid = $('<h4>');
            isSmtpValid.text("Email SMTP check: " + abstractOutput.isSmtpValidString);
            isSmtpValid.attr('class', 'data-output');

            // append all elements to our output element
            outputEl.append(emailInput);
            outputEl.append(deliverabilityOutput);
            outputEl.append(qualityScoreOutput);
            outputEl.append(isFreeEmail);
            outputEl.append(isDisposableEmail);
            outputEl.append(isRoleEmail);
            outputEl.append(isCatchallEmail);
            outputEl.append(isSmtpValid);
        });
}

/**
 * @param {function} getAbstractDataNoQuery - this is a copy of the getAbstractData fxn that will append dummy output to html doc, thereby avoiding unnecessary queries during testing
 */
function getAbstractDataNoQuery() {

    var outputEl = $('#output');
    var emailInput = $('<h4>');
    emailInput.text('Email: jkwalsh127@gmail.com');
    emailInput.attr('class', 'data-output');
    var deliverabilityOutput = $('<h4>');
    deliverabilityOutput.text('Deliverability: DELIVERABLE');
    deliverabilityOutput.attr('class', 'data-output');
    var qualityScoreOutput = $('<h4>');
    qualityScoreOutput.text('Quality score: 0.70');
    qualityScoreOutput.attr('class', 'data-output');
    var isFreeEmail = $('<h4>');
    isFreeEmail.text("From Abstract's list of free email providers: TRUE");
    isFreeEmail.attr('class', 'data-output');
    var isDisposableEmail = $('<h4>');
    isDisposableEmail.text("From Abstract's list of disposable email providers: FALSE");
    isDisposableEmail.attr('class', 'data-output');
    var isRoleEmail = $('<h4>');
    isRoleEmail.text("Email for role rather than individual: FALSE");
    isRoleEmail.attr('class', 'data-output');
    var isCatchallEmail = $('<h4>');
    isCatchallEmail.text("Email is a catchall for its domain: FALSE");
    isCatchallEmail.attr('class', 'data-output');
    var isSmtpValid = $('<h4>');
    isSmtpValid.text("Email SMTP check: TRUE");
    isSmtpValid.attr('class', 'data-output');

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