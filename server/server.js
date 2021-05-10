const expressSession = require('express-session');
const express        = require('express');
const http           = require('http');
const path           = require('path');
const app            = express();
const server         = http.Server(app);
const socket         = require('socket.io');
const io             = socket(server);

const passport       = require('./middlewares/authentication');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());
app.use(expressSession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


//will rename when controller is fixed just testing prisma
app.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email : email,
    },
  });

  if(user) res.json({error: 'Email in use!'});
  else{
    const result = await prisma.user.create({
      data: {
        email,
        name,
        password,
        photoURL: 'https://s.pximg.net/common/images/no_profile.png',
        socketId : null,
        profile : {
          create : {
            bio : 'fill me up!'
          }
        }
      },
    })
    res.json(result);
  }
});

//get all users
app.get('/user', async (req, res) =>{
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
})

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