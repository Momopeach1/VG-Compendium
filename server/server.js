const expressSession = require('express-session');
const express        = require('express');
const http           = require('http');
const path           = require('path');
const app            = express();
const server         = http.Server(app);
const socket         = require('socket.io');
const io             = socket(server);
const dotenv         = require('dotenv').config() 
const passport       = require('./middlewares/authentication');

app.use(express.json());
app.use(expressSession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 8080;

// Controller Setup
app.use('/api',require('./controllers'));

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === 'production' || true) {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // all unknown routes should be handed to our react app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

server.listen(PORT,()=>console.log('listening to port:', PORT));