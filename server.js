/**
 * This file was created to serve the angular app; that allows it to be deployed on the cloud.
 *
 * @author Matheus
 * @since  2022.12.24
 */


let cors = require('cors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let app = express();
const IP = require('ip');

// logger (instance of morgan) log the requests
app.use(logger('dev'));

// Enable cors
app.use(cors());
app.options('*', cors());

app.use(express.static(__dirname + '/dist')); 

// To Angular Router
app.get('/*', function (req, res) { 
    // Angular is a single page application. The final "compilation" has only the index.html with a bunch of scripts.
    res.sendFile(path.join(__dirname + '/dist/index.html')); 
}); 

// To any other route
app.get('*', function(req, res){
    res.redirect("/");
});

// Start the server.
app.listen(process.env.PORT || 8080, () => {
    const ipAddress = IP.address();
    console.log(`====> Angular server is running at http://${ipAddress}:${process.env.PORT || 8080}`);
})