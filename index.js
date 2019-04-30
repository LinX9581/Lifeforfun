var express = require('express');
var app = express();
var http = require('http').Server(app);
var config = require("./config.js");
const host = '0.0.0.0';
const port = process.env.PORT || 9292;

var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;

var MONGODB_URI = 'mongodb://admin:dfgh8520@ds249311.mlab.com:49311/sockettest';


app.use(express.static('public')); //靜態檔案放置區

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/login.html', function(req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.get('/signup.html', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.get('/chat.html', function(req, res) {
    res.sendFile(__dirname + '/chat.html');
});

app.get('/chatall', function(req, res) {
    res.sendFile(__dirname + '/chatall.html');
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



usocket = [];
user = [];
// chatroom
io.on('connection', (socket) => { //(socket)=>  等於 function(socket){}
    //username=客戶端傳來用戶輸入的name
    socket.on('new user', (username) => {
        if (!(username in usocket)) { //username指向usocket
            socket.username = username; //給予每個username一個socket
            usocket[username] = socket;
            //console.log(socket);
            user.push(username); //在陣列尾新增元素 ，並返回新的長度
            socket.emit('login', user);
            socket.broadcast.emit('user joined', username, (user.length - 1));
            console.log(user);

        }
    })

    /*
    res	=	var req = {
    			'addresser':name,
    			'recipient':recipient,
    			'type':'plain',
    			'body':val
    		}
    */

    //私人
    socket.on('send private message', function(res) {
        console.log(res);

        //msg to db
        MongoClient.connect(MONGODB_URI, function(err, db) {
            if (err) throw err;
            var collection = db.collection('dbtest');
            var req = {
                'body': res
            };

            collection.insert(req);
        });

        if (res.recipient in usocket) {
            usocket[res.recipient].emit('receive private message', res);
        }
    });

    //一多對
    socket.on('chat room', function(name, valAll) {
        console.log(name, valAll);
        io.emit('chat room', name, valAll);
    });

    socket.on('disconnect', function() {
        //移除
        if (socket.username in usocket) {
            delete(usocket[socket.username]);
            user.splice(user.indexOf(socket.username), 1);
        }
        console.log(user);
        socket.broadcast.emit('user left', socket.username)
    })

});



http.listen(port, host, function() {
    console.log("Server started.......");
});