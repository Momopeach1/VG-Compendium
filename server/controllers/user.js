const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const passport = require('../middlewares/authentication');
const bcrypt   = require('bcryptjs');

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

// @Route POST /api/user/signup
router.post('/signup', async (req, res) => {
  let { email, name, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email : email,
    },
  });

  if(user) res.json({error: 'Email in use!'});
  else{
    password = await bcrypt.hash(password, 12);
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

// @Route POST /api/user/login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

// @Route GET /api/user/allusers
router.get('/allusers', async (req, res) =>{
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
})


// @Route GET /api/user/check
router.get('/check', passport.isLoggedIn(), (req, res) => {
  res.json(req.user);
});

// // @Route GET /api/user
// router.get('/', (req, res, next) => {
//   User.find({}, (findErr, findRes) => {
//     if (findErr) next(findErr);

//     res.json(findRes);
//   })
// });

// // @Route PUT /api/user
// router.put('/', passport.isLoggedIn(), upload.single('photo'), async (req, res, next) => {
//   const query = { email: req.user.email };
//   const update = { ...req.body };

//   if (req.file) {
//     await cloudinary.uploader.upload(req.file.path, (error, result) => {
//       update.photoURL = result.secure_url;
//     });
//   }


//   User.findOne(query, (error, result) => {
//     if (error) return next(error);
//     if (update.currentPassword !== undefined) result.comparePassword(update.currentPassword, (error, isMatch) => {
//       updateUser(error, isMatch, result);
//     }); else updateUser(error, true, result);
//   });


//   const updateUser = (error, isMatch, user) => {
//     if (error) return next(error);
//     if (!isMatch) return res.status(409).send('Wrong password');
    
//     delete update.currentPassword;
//     delete update.photo;
//     if (update.password !== undefined && update.password.length === 0) delete update.password; //when we change this field to hidden delete this
//     if (update.password) {
//       user.password = update.password;
//       user.save(error => {
//         if (error) return next(error);
//         res.json(update);
//       })
//     } else {
//       User.updateOne(query, update, (updateErr, updateRes) => {
//         if (updateErr) next(updateErr);
//         delete update.currentPassword;
//         res.json(update);
//       })    
//     }
//   }
// })

// // @Route PUT /api/user/change-password
// router.put('/change-password', (req, res) => {
//   User.findOne({ email: req.body.email}, (error, result) => {
//     if (error) return res.status(500).send(error);
    
//     result.password = req.body.password;
    
//     result.save((error, result) => {
//       if (error) return res.status(500).send(error);

//       res.json(result);
//     })
//   })
// })


// // @Route POST /api/user/signout
// router.post('/signout', (req, res) => {
//   req.logout();
//   res.status(200).json({ message: "ok" });
// })



module.exports = router;