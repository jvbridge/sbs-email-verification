/**
 * @type {string} a refrence to the abstract API URL
 */
const ABSTRACT_API_URL ="https://emailvalidation.abstractapi.com/v1/";

/**
 * @type {string} default email to avoid unnecessary api queries
 */
var userInput = 'jkwalsh127@gmail.com';

/**
 *  @type {string} api key for Abstract
 */
var key = 'b27bbe70118d43f5aa1bce1a9262ef17';

/**
 * A nice use of our dummy data here
 * This is UGLY in the future we'll pull it from the .json file directly
 */
 const DUMMY_DATA = {
    "email": "jkwalsh127@gmail.com",
    "autocorrect": "",
    "deliverability": "DELIVERABLE",
    "quality_score": "0.70",
    "is_valid_format": {"value": true, "text": "TRUE"},
    "is_free_email": {"value": true, "text": "TRUE"},
    "is_disposable_email": {"value": false, "text": "FALSE"},
    "is_role_email": {"value": false, "text": "FALSE"},
    "is_catchall_email": {"value": false, "text": "FALSE"},
    "is_mx_found": {"value": true, "text": "TRUE"},
    "is_smtp_valid": {"value": true, "text": "TRUE"}
};

 /**
  * Creates an object to add to the DOM, and appends it to the jquery element
  * @param {object} abstractObject - the data object returned from the API call
  * @param {object} jqueryEle - the jquery element to append this to
  */
function createAbstractElement(data, jqueryEle) {
    var toAppend = [];

    // create an element to display the email
    var emailInput = $('<h4>');
    emailInput.text('Email: ' + data.email);
    emailInput.attr('class', 'data-output has-text-centered message-body');
    toAppend.push(emailInput);

    // create an element to show if the email is deliverable to
    var deliverabilityOutput = $('<h4>');
    deliverabilityOutput.text('Deliverability: ' + data.deliverability);
    deliverabilityOutput.attr('class', 'data-output has-text-centered message-body');
    toAppend.push(deliverabilityOutput);

    // create an element to show the quality score
    var qualityScoreOutput = $('<h4>');
    qualityScoreOutput.text('Quality score: ' + data.qualityScore);
    qualityScoreOutput.attr('class', 'data-output has-text-centered message-body');
    toAppend.push(qualityScoreOutput);

    // create an element to show if it's a free email
    var isFreeEmail = $('<h4>');
    isFreeEmail.text("From Abstract's list of free email providers: " + data.is_free_email.text);
    isFreeEmail.attr('class', 'data-output has-text-centered message-body');
    toAppend.push(isFreeEmail);

    // create an element to show if it's a disposable email
    var isDisposableEmail = $('<h4>');
    isDisposableEmail.text("From Abstract's list of disposable email providers: " + data.is_disposable_email.text);
    isDisposableEmail.attr('class', 'data-output has-text-centered message-body');
    toAppend.push(isDisposableEmail);

    // create an element to show if the email is a person or a role
    var isRoleEmail = $('<h4>');
    isRoleEmail.text("Email for role rather than individual: " + data.is_role_email.text);
    isRoleEmail.attr('class', 'data-output has-text-centered message-body');
    toAppend.push(isRoleEmail);

    // create an element to show if the email is a "catch all" one for its domain
    var isCatchallEmail = $('<h4>');
    isCatchallEmail.text("Email is a catchall for its domain: " + data.is_catchall_email.text);
    isCatchallEmail.attr('class', 'data-output has-text-centered message-body');
    toAppend.push(isCatchallEmail);

    // create an element to show if the email has SMTP
    var isSmtpValid = $('<h4>');
    isSmtpValid.text("Email SMTP check: " + data.is_smtp_valid.text);
    isSmtpValid.attr('class', 'data-output has-text-centered message-body');
    toAppend.push(isSmtpValid);
    
    // append them all to the element we gave
    toAppend.forEach((value) => jqueryEle.append(value));
}


/**
 * Makes the request to the Abstract API, stores data as object, and appends the
 * data to the DOM
 */
function getAbstractData() {
    // Fetch data from the appropriate URL, applying the neccesasry API key and
    // user-submitted email as the variables key and userInput, respectively
    var requestUrl = ABSTRACT_API_URL + "?api_key=" + key + '&email=' + userInput;

    // main fetch
    fetch(requestUrl)
        .then(function (response) {
            // simply return the response of the server to the next promise
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // check if the abstract API detects a typo in the submission
            if (data.autocorrect !== "") {
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

            // get a refrence to the output element to put the data on
            var outputEl = $('#output');
            createAbstractElement(data, outputEl);
        });
}

/**
 * @param {function} getAbstractDataNoQuery - this is a copy of the getAbstractData fxn that will append dummy output to html doc, thereby avoiding unnecessary queries during testing
 */
function getAbstractDataNoQuery(userInput) {
    var outputEl = $('#output');
    createAbstractElement(DUMMY_DATA, outputEl);
    console.log(userInput);
}

// adds the event listener for the email button 
document.addEventListener("click", function(event) {
    if (event.target.matches("#email-btn")) {
        var formInput = document.querySelector("#email-input");
        userInput = formInput.value;
        console.log(userInput);
        getAbstractDataNoQuery(userInput);
    }
});

document.addEventListener("keydown", (event) =>{
    if (event.key === "Enter" && ($("#email-input").is(":focus"))){
        userInput = formInput.value;
        console.log(userInput);
        getAbstractDataNoQuery(userInput);
    }
});

/**
 * A dummy query for the have I been pwned API
 */
var PWNED_DUMMY_DATA = [
    {
    "Name":"Adobe",
    "Title":"Adobe",
    "Domain":"adobe.com",
    "BreachDate":"2013-10-04",
    "AddedDate":"2013-12-04T00:00Z",
    "ModifiedDate":"2013-12-04T00:00Z",
    "PwnCount":152445165,
    "Description":"In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, <em>encrypted</em> password and a password hint in plain text. The password cryptography was poorly done and <a href=\"http://stricture-group.com/files/adobe-top100.txt\" target=\"_blank\" rel=\"noopener\">many were quickly resolved back to plain text</a>. The unencrypted hints also <a href=\"http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html\" target=\"_blank\" rel=\"noopener\">disclosed much about the passwords</a> adding further to the risk that hundreds of millions of Adobe customers already faced.",
    "DataClasses":["Email addresses","Password hints","Passwords","Usernames"],
    "IsVerified":true,
    "IsFabricated":false,
    "IsSensitive":false,
    "IsRetired":false,
    "IsSpamList":false,
    "LogoPath":"https://haveibeenpwned.com/Content/Images/PwnedLogos/Adobe.png"
    },
    {
    "Name":"BattlefieldHeroes",
    "Title":"Battlefield Heroes",
    "Domain":"battlefieldheroes.com",
    "BreachDate":"2011-06-26",
    "AddedDate":"2014-01-23T13:10Z",
    "ModifiedDate":"2014-01-23T13:10Z",
    "PwnCount":530270,
    "Description":"In June 2011 as part of a final breached data dump, the hacker collective &quot;LulzSec&quot; <a href=\"http://www.rockpapershotgun.com/2011/06/26/lulzsec-over-release-battlefield-heroes-data\" target=\"_blank\" rel=\"noopener\">obtained and released over half a million usernames and passwords from the game Battlefield Heroes</a>. The passwords were stored as MD5 hashes with no salt and many were easily converted back to their plain text versions.",
    "DataClasses":["Passwords","Usernames"],
    "IsVerified":true,
    "IsFabricated":false,
    "IsSensitive":false,
    "IsRetired":false,
    "IsSpamList":false,
    "LogoPath":"https://haveibeenpwned.com/Content/Images/PwnedLogos/BattlefieldHeroes.png"
    }
];