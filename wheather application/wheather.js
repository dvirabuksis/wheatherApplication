const api = require('./api.json');
//Require https module
const https = require('https');
//Require http module for status codes
const http = require('http');

//Print Error Messages
function printError(error) {
    console.error(error.message);
}

//Function to print message to console
function printMessage(location, degrees) {
    const message = `Current temperture in ${location} is ${(degrees - 273.15).toFixed(2)} C`;
    console.log(message);
}

function get(location) {
    try {
        // Connect to the API URL (https://api.openweathermap.org/)
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${api.key}`, response => {
            if (response.statusCode === 200) {
                let body = "";
                // Read the data
                response.on('data', data => {
                    body += data.toString();
                });

                response.on('end', () => {
                    try {
                        // Parse the data
                        const details = JSON.parse(body);
                        // Print the data
                        printMessage(location, details.main.temp);
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const message = `There was an error getting the wheather in ${location} 
        (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        });
        request.on('error', printError);
    } catch (error) {
        printError(error);
    }
}

module.exports.get = get;
