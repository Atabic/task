const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const config    = require('../config');
const User = require("../models/User");

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.headers.authorization;
  }
  return token;
}

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: config.JWT_SECRET,
  passReqToCallback: true
}, async (req, payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);
    console.log(user);
    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    req.user = user;
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));


// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField : 'email',
    passwordField : 'password',
},
   function(email, password, done) {
     console.log('Im coming here');
      User.findOne({
        email: email
      },async function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, {msg: 'Oops! Email or Password is wrong.'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, {msg: 'Oops! Email or Password is wrong.'});
        }
        return done(null, user);
      });
  }
));