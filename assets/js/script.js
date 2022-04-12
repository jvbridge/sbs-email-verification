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
            });
};