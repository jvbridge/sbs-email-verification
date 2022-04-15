/**
 * @type {string} a reference to the abstract API URL
 */
const ABSTRACT_API_URL ="https://emailvalidation.abstractapi.com/v1/";

/**
 * @type {string} default email to avoid unnecessary api queries
 */
var userInput = 'jkwalsh127@gmail.com';

/**
 *  @type {string} api key for Abstract
 */
var key = '558f0f10abe14655b9b28b49159392b1';

/**
 * A nice use of our dummy data here
 * This is UGLY in the future we'll pull it from the .json file directly
 */
 const ABSTRACT_DUMMY_DATA = {
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
 * This is the regex we use to match with emails it is long and complicated
 * solution found at:
 * https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
 */
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/**
 * @type {object[]} an array of query results from the api queries we have made
 * used to store previous queries for ease of access as well as 
 */
var queryHistory = [];

/**
 * The key used for storing our history to local storage
 * @type {string}
 */
const HISTORY_KEY = "history";

/**
 * A reference to the jquery object for the output
 */
var outputEle = $("#output");

 /**
  * Creates an object to add to the DOM, and appends it to the jquery element
  * @param {object} abstractObject - the data object returned from the API call
  * @param {object} jqueryEle - the jquery element to append this to
  */
function createAbstractElement(data, jqueryEle) {
    var toAppend = [];
    console.log("making abstract element: ");
    // create an element to display the email
    var emailInput = $('<h4>');
    emailInput.text('Email: ' + data.email);
    // Gave attribute of centering the text, spaceing with a card body, and text it dark blue
    emailInput.attr('class', 'data-output has-text-centered card card-content has-text-link-dark m-3 is-family-monospace has-background-white-ter is-size-5');
    toAppend.push(emailInput);

    // create an element to show if the email is deliverable to
    var deliverabilityOutput = $('<h4>');
    deliverabilityOutput.text('Deliverability: ' + data.deliverability);
    deliverabilityOutput.attr('class', 'data-output has-text-centered card card-content has-text-link-dark m-3 is-family-monospace has-background-white-ter is-size-5');
    toAppend.push(deliverabilityOutput);

    // create an element to show the quality score
    var qualityScoreOutput = $('<h4>');
    qualityScoreOutput.text('Quality score: ' + data.quality_score);
    qualityScoreOutput.attr('class', 'data-output has-text-centered card card-content has-text-link-dark m-3 is-family-monospace has-background-white-ter is-size-5');
    toAppend.push(qualityScoreOutput);

    // create an element to show if it's a free email
    var isFreeEmail = $('<h4>');
    isFreeEmail.text("From Abstract's list of free email providers: " + data.is_free_email.text);
    isFreeEmail.attr('class', 'data-output has-text-centered card card-content has-text-link-dark m-3 is-family-monospace has-background-white-ter is-size-5');
    toAppend.push(isFreeEmail);

    // create an element to show if it's a disposable email
    var isDisposableEmail = $('<h4>');
    isDisposableEmail.text("From Abstract's list of disposable email providers: " + data.is_disposable_email.text);
    isDisposableEmail.attr('class', 'data-output has-text-centered card card-content has-text-link-dark m-3 is-family-monospace has-background-white-ter is-size-5');
    toAppend.push(isDisposableEmail);

    // create an element to show if the email is a person or a role
    var isRoleEmail = $('<h4>');
    isRoleEmail.text("Email for role rather than individual: " + data.is_role_email.text);
    isRoleEmail.attr('class', 'data-output has-text-centered card card-content has-text-link-dark m-3 is-family-monospace has-background-white-ter is-size-5');
    toAppend.push(isRoleEmail);

    // create an element to show if the email is a "catch all" one for its domain
    var isCatchallEmail = $('<h4>');
    isCatchallEmail.text("Email is a catchall for its domain: " + data.is_catchall_email.text);
    isCatchallEmail.attr('class', 'data-output has-text-centered card card-content has-text-link-dark m-3 is-family-monospace has-background-white-ter is-size-5');
    toAppend.push(isCatchallEmail);

    // create an element to show if the email has SMTP
    var isSmtpValid = $('<h4>');
    isSmtpValid.text("Email SMTP check: " + data.is_smtp_valid.text);
    isSmtpValid.attr('class', 'data-output has-text-centered card card-content has-text-link-dark m-3 is-family-monospace has-background-white-ter is-size-5');
    toAppend.push(isSmtpValid);
    
    console.log("appending information: ", toAppend);
    console.log("appending to: ", jqueryEle);
    // append them all to the element we gave
    toAppend.forEach((value) => jqueryEle.append(value));
}


/**
 * Makes the request to the Abstract API, stores data as object, and appends the
 * data to the DOM
 * @returns {object} the data object gained from the API
 * @returns {null} in the event that the query is not successful it returns null
 */
async function getAbstractData(query) {
    // Fetch data from the appropriate URL, applying the neccesasry API key and
    // user-submitted email as the variables key and userInput, respectively
    console.log("getting abstract data with query: ", query);
    var requestUrl = ABSTRACT_API_URL + "?api_key=" + key + '&email=' + query;
    var returnedData;
    //write function here that swaps in elements

    // main fetch
    returnedData = await fetch(requestUrl)
        .then(function (response) {
            console.log("got a response: ", response);
            if (!response.ok){
                var responseStr = "Response: " + response.status;
                swal(
                    "Error!", 
                    "Looks like we are having a hard time reaching the API lets use some dummy data instead\n" + responseStr
                );
                return ABSTRACT_DUMMY_DATA;
            }
            // simply return the response of the server to the next promise
            return response.json();
        })
        .then(function (data) {
            console.log("we got this data: ", data);
            // check if the abstract API detects a typo in the submission
            if (data.autocorrect !== "") {
                console.log(data.autocorrect);
                // sweetalert.js notification of the problem with a solution
                swal("Error", "There was a typo detected. Maybe you meant" + 
                    data.autocorrect + 
                    ", in the mean time we will display dummy data" );
                return ABSTRACT_DUMMY_DATA;
            }

            // check if it's an invalid email format
            if (data.is_valid_format == false) {
                // promt the user about the problem with sweetalert.js
                swal("Error", "The email entered was not in a valid format. Please try again. in the mean time we will display dummy data");
                return ABSTRACT_DUMMY_DATA;
            }

            return data;
        });
    return returnedData;
}

/**
 * this is a copy of the getAbstractData fxn that will append dummy output to 
 * html doc, thereby avoiding unnecessary queries during testing
 * @param {string} userInput - kept in place to make ease of switching the 
 * function when this comes back around
 * @returns {object} the dummy data
 */
function getAbstractDataNoQuery(userInput) {
    var outputEl = $('#output');
    createAbstractElement(ABSTRACT_DUMMY_DATA, outputEl);
    return ABSTRACT_DUMMY_DATA;
}

// adds the event listener for the email button 
document.addEventListener("click", function(event) {
    if (event.target.matches("#email-btn")) {
        search();
    }
});

// adds the event listener for the key down event
document.addEventListener("keydown", (event) =>{
    if (event.key === "Enter" && ($("#email-input").is(":focus"))){
        search();
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

/**
 * This is the main search function to be used in the web app it will grab the
 * query on its own and send it to the appropriate functions
 * TODO: make work with asyncronous functions properly
 */
async function search(){

    clearOutput();
    // get the input from the form, make it all lower case
    var formInput = $("#email-input");
    var query = formInput.val().toLowerCase();

    // validate our input to see if it's good
    if (!isValid(query)){
        swal("Error", "Looks like that's not an email address!");
        return;
    }

    // Start animation here.
    $("#terminal-text").attr("class","typed-out2");
    $("#terminal-text").text("Email Received!");

    setTimeout(insertFetchAnim, 2000);

    function insertFetchAnim() {
    var fetchAnim = 
        "<div class='typed-out3'id='#terminal-text'>Fetching Data...</div> <div class='typed-out4'id='#terminal-text'>Retrieving...</div> <div class='typed-out5'id='#terminal-text'>Query Returned!!!</div>";
        document.querySelector('#terminal-text').innerHTML = fetchAnim;
    }
    // End of animation here.

    // empty the input 
    formInput.val("");

    // check the history for previous queries
    var hist = readHistory(query);
    if(hist){
        // found a previous query, lets use it and and be done with it
        swal("Success!", "Looks like you looked this up already, we will use your old data for this!");
        createAbstractElement(hist.data.abstractData, outputEle);
        hist.data.pwnedData.forEach((value)=> createPwnedElement(value, outputEle));
        return;
    }
    

    // get the abstract data from the abastract data UI
    var abstractData = await getAbstractData(query);
    
    // get the pwed data from the pwned API
    var pwnedData = await getPwnedDataNoQuery(query); 
    
    // make an object holding both for the 
    var historyData = {
        "abstractData":abstractData,
        "pwnedData": pwnedData
    };

    // add it to our history
    addToHistory(query, historyData);
    
    // add the history to local storage
    storeHistory();
    // make an abstract element for it
    createAbstractElement(abstractData, outputEle);
    // make pwned elements for each one
    pwnedData.forEach((value) => createPwnedElement(value,outputEle));

}

console.log(search)

/**
 * Appends what we were doing to the history 
 * @param {string} query the user's query that caused this history item
 * @param {object} data the resulting history item from said query
 */
function addToHistory(query, data){
    var historyItem = {
        "query": query,
        "data": data
    };
    queryHistory.push(historyItem);
}

/**
 * Writes our history to local storage
 */
function storeHistory(){
    localStorage.setItem(HISTORY_KEY, JSON.stringify(queryHistory));
}

/**
 * Rretrieves our history from local storage
 */
function retrieveHistory(){
    var data;
    data = localStorage.getItem(HISTORY_KEY);
    if (data){
        queryHistory = JSON.parse(data);
    }
}

/**
 * @type {string} a reference to the HAVE_I_BEEN_PWNED API URL
 */
 const HAVE_I_BEEN_PWNED_URL ="http://haveibeenpwned.com/api/v3/breachedaccount/";

 /** 
  * @type {string} userInput - default email to avoid unnecessary API queries
  */
 var userAccount = 'juliuscanales118@gmail.com';
 
 /**
  *  @type {string} key - API key for PWNED
  */
const PWNED_KEY = '168f3571c3ed46308d71ae3e158a2cc7';
 
 
 /**
  * This function returns the information from the pwned API, or returns dummy 
  * data if we can't get in contact with the server
  * @param {string} query - the query string for the email to enter
  * @returns {object} data we can use to append information to the DOM
  */
  async function getPwnedData(query) {
    var requestPwnedURL = HAVE_I_BEEN_PWNED_URL + "jvbridge@gmail.com" + "?truncateResponse=false";
    var header = new Headers();
    header.append("hibp-api-key",PWNED_KEY);
    console.log("made a header: ", header );
    console.log("header has a value of: ", header.get("hibp-api-key"));
    console.log("querying the pwned server with:", requestPwnedURL);
    var data = await fetch(requestPwnedURL, {
        mode: "no-cors",
        headers: header
    })
        .then(function (response) {
            var breakpoint = 0;
            console.log("got a response: ", response);
            // if we can't contact the server 
            if (!response.ok){
                console.log("bad response info: ", response.json());
                var responseStr = "Response: " + response.message;
                swal(
                    "Error!", 
                    "Looks like we are having a hard time reaching the API lets use some dummy data instead\n" + responseStr
                );
                return DUMMY_DATA_PWNED;
            }
            // return what we got
            console.log("pwned response data: ", response.json());
            return response.json();
        });
    return data;
 }

 /**
  * This is a placeholder for the function we will use when we want to start querying the API
  * @param {*} query - placeholder for the real function when we impliment it
  * @returns {object} - the dummy data we already have in the file
  */
function getPwnedDataNoQuery(query){
    return DUMMY_DATA_PWNED;
}
 
 /**
 * A dummy query for the have I been pwned API
 */
var DUMMY_DATA_PWNED = [
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



  /**
   * Creates an object to add to the DOM, and appends it to the jquery element
   * @param {object} pwnedObject - the data object returned from the API call
   * @param {object} jqueryPwnedElement - the jquery element to append this to
   */
 function createPwnedElement (pwnedData, jqueryPwnedElement) {
    /* this was made using the example code given by bulma, and putting the api
     dummy output on it */
    
    // outer card 
    var pwnedToAppend = $('<div class="card mb-3"></div>');
    // inner card
    var cardContent = $("<div class='card-content'></div>");
    pwnedToAppend.append(cardContent);

    // these all make the image on the left of the card
    var mediaContainer = $("<div class='media'></div>");
    cardContent.append(mediaContainer);
    
    var mediaLeft = $("<div class='media-left'></div>");
    mediaContainer.append(mediaLeft);

    var figure = $("<figure class='image is-48x48'></figure>");
    mediaLeft.append(figure);

    // our actual image
    var imageLeft = $("<img />");
    imageLeft.attr("src", pwnedData.LogoPath);
    imageLeft.attr("alt", pwnedData.Title);
    figure.append(imageLeft);

    // title 
    var titleContainer = $("<div class='media-content'></div>");

    var title = $("<p class='title is-4'>" + pwnedData.Title + "</p>");
    titleContainer.append(title);

    var subtitle = $("<p class='subtitle is-6'>" + pwnedData.Domain+ "</p>");
    titleContainer.append(subtitle);

    mediaContainer.append(titleContainer);

    // the description of what happened
    var blurb = $("<div class='content'>"+ pwnedData.Description+"</div>");
    cardContent.append(blurb);

    blurb.append($("<br />"));

    blurb.append($("<time datetime='" + pwnedData.BreachDate + "'></time>"));

    jqueryPwnedElement.append(pwnedToAppend);
 } 

/**
 * Checks if the input is okay to put through the 
 * @param {string} input given 
 * @returns {true} returned if the input is valid and should be sent to the API
 * @returns {false} returned if the input is not valid and should not be sent
 */
function isValid(input){
    var email = input.toLowerCase();
    var match =  email.match(EMAIL_REGEX);
    if (match){
        return true;
    }
    return false;
}

/**
 * Clears all of the output from the last API query
 */
function clearOutput(){
    outputEle.empty();
}

/**
 * Reads through the history and returns the first query that matches one in the
 * history
 * @param {string} query the query string we are searching for
 * @returns {false} if there are no entries for the history
 * @returns {object} the history object found
 */
function readHistory(query){
    var ret = false;
    queryHistory.forEach((value) =>{
        if (value.query === query){
            ret = value;
        }
    });
    return ret;
}

// Everything is defined we just need to get the history when we do run this
retrieveHistory();
