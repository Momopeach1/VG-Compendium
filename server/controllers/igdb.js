const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const Twitch = require('../apis/Twitch');
const igdb = require('../apis/igdb');

// this refreshes every 90 days or so
// Make sure to call /setup to refresh the token
var igdbAuth = null;

//using walkietalkie creds for now
cloudinary.config({
  cloud_name: 'walkietalkie',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
  
const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });

// @Route POST /api/igdb/setup
router.post('/setup', (req, res) => {
  Twitch.post()
  .then(response=>{
    igdbAuth = 'Bearer ' + response.data.access_token;
    res.json({success: 'true'});
  });
});

// @Route POST /api/igdb/game
// this uses API /games search where req.body is a string query
router.get('/game', (req, res) =>{
  let query = JSON.stringify(req.body);
  console.log(query);
  igdb(igdbAuth, req.body ).post('/games')
  .then(response => {
    console.log(response.data)
    res.json(response.data);
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;