var express = require('express');
var app = express();
var http = require('http').Server(app);
var config = require("./config.js");
const host = '0.0.0.0';
const port = process.env.PORT || 9292;

app.use(express.static('public')); //靜態檔案放置區

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


var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "2821073464577208",
    clientSecret: "5128a08737c0be20d5f8770a13e25b97",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


http.listen(port, host, function() {
    console.log("Server started.......");
});