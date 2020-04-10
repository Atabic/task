var controllers = require("./../controllers");
const resp = require("../utils/response-handler");
const multy = require("../custom-middlewares/multy");
const User = require("../models/User");
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const config    = require('../config');

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

const passportSignIn = passport.authenticate('local', { session: false } );
const passportJWT = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
    app.use(passport.initialize());


    app.put('/api/updateProfile',passportJWT,controllers.users.updateProfile);
    app.post("/api/signup",multy.single("image"),controllers.users.signup);
    app.post('/api/signin', passportSignIn, controllers.users.signIn);
}
