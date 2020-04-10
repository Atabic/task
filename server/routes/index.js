var controllers = require("./../controllers");
const resp = require("../utils/response-handler");
const multy = require("../custom-middlewares/multy");
const User = require("../models/User");

const passport = require('passport');

const passportSignIn = passport.authenticate('local', { session: false } );
const passportJWT = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
    app.use(passport.initialize());


    app.put('/api/updateProfile',passportJWT,controllers.users.updateProfile);
    app.post("/api/signup",multy.single("image"),controllers.users.signup);
    app.post('/api/signin', passportSignIn, controllers.users.signIn);
}
