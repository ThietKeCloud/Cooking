const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../key');
const User = require('../model/User');
const bcrypt = require('bcrypt')



passport.serializeUser(function(user, done) {

    done(null, user);
  });
  
passport.deserializeUser(function(id, done) {
  
     done(null, id);
});


// Google
passport.use(new GoogleStrategy({
  
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
 
    if(profile.id)
    {
      
      User.findOne({where:{password: profile.id}})
      .then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          var hash = bcrypt.hashSync(profile.id, 10);
          new User({
            password: hash,
            email: profile.emails[0].value,
            username: profile.name.familyName + ' ' + profile.name.givenName,
            fullname: profile.name.familyName + ' ' + profile.name.givenName,
            role: 0,
            check: 1
          })
            .save()
            .then(user => done(null, user));
        }
      })
    }
  
    return done(null, profile);
  }
));

// Facebook
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email'],
    // enableProof: true
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    if(profile.id)
    {
      
      User.findOne({where:{password: profile.id}})
      .then((existingUser) => {
        if (existingUser) {
            
          cb(null, existingUser);
        } else {
          console.log(prof);
          new User({
            password: hash,
            email: profile.emails[0].value,
            username: profile.name.familyName + ' ' + profile.name.givenName,
            fullname: profile.name.familyName + ' ' + profile.name.givenName,
            role: 0,
            check: 1
          })
            // .save()
            // .then(user => cb(null, user));
        }
      })
    }
 
  }
));