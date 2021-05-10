const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
require('./Controller/signupController');


express.urlencoded();
express.json();
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }));

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
app.use(passport.initialize());
app.use(passport.session());



// app.use('/', require('./Router/indexRoute'));

// auth02 Google
app.get('/failed', (req, res) => res.send('You Failed to log in!'))
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

// auth02 Facebook
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['profile', 'email'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


//   test
app.get('/',(req,res)=>{
    res.send('page home');
})
app.get('/login',(req,res)=>{
    res.send('login');
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}`);
});

 
