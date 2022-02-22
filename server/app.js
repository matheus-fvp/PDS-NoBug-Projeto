const express = require("express");
const path = require("path");
var cors = require('cors');
var https = require('https');
var fs = require('fs');
const dotenv = require("dotenv");
var privateKey  = fs.readFileSync('cert/key.key', 'utf8');
var certificate = fs.readFileSync('cert/certificate.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const twitterCall = require("./twitterCall");

const app = express();
dotenv.config();


app.use(cors()); // só no desenvolvimento
app.use(express.json()); // converte pra json
app.use(express.static(path.join(__dirname + "/../client/")));

// api routes middleware
app.use(twitterCall);

// html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/index.html"));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/search.html"));
});


var httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, "localhost");