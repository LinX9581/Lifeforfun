var express = require('express');
var app = express();
var http = require('http').Server(app);
var config = require("./config.js");
const host = '0.0.0.0';
const port = process.env.PORT || 9292;

app.use(express.static('public'));  //靜態檔案放置區

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var githubOAuth = require('github-oauth')({
    githubClient: config.GITHUB_KEY,
    githubSecret: config.GITHUB_SECRET,
    baseURL: 'http://localhost:' + port,
    loginURI: '/auth/github',
    callbackURI: '/auth/github/callback'
})

app.get("/auth/github", function(req, res) {
    console.log("started oauth");
    return githubOAuth.login(req, res);
});

app.get("/auth/github/callback", function(req, res) {
    console.log("received callback");
    return githubOAuth.callback(req, res);
});

githubOAuth.on('error', function(err) {
    console.error('there was a login error', err)
})

githubOAuth.on('token', function(token, serverResponse) {
    serverResponse.end(JSON.stringify(token))
})



http.listen(port, host, function() {
    console.log("Server started.......");
});