const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt   = require('bcryptjs');

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if(!user) return done(null, false);
  const Valid = await bcrypt.compare(password, user.password);
  if(Valid) return done(null, user);
  else return done(null, false);

}));

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if(user) return done(null, user);
  else return done(null, false);
});

passport.isLoggedIn = () => (req, res, next) => (req.user? next() : res.sendStatus(401));



module.exports = passport;