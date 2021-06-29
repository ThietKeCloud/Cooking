const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userModel = require("../seeders/User");
const userController = require("../Controllers/userController");

const nodemailer = require('nodemailer'); // khai báo sử dụng module nodemailer
const { update, update1 } = require("../seeders/User");
var rand, host, link;


router.get("/", (req, res, next) => {
  req.session.returnURL = req.query.returnURL;
  // console.log(req.query.returnURL);
  res.render("signin", { banner: 'Sign In' });
});

router.post("/", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let keepLoggedIn = req.body.keepLoggedIn != undefined;


  userController.getUserByUsername(username).then((user) => {
    if (user.check && user.lock != 1) {
   
      if (userController.comparePassword(password, user.password)) {
        req.session.cookie.maxAge = keepLoggedIn
          ? 30 * 24 * 60 * 60 * 100
          : null;
        
        req.session.user = user;
        if(user.role === 1)
        {
          req.session.teacher = 1;
        }
        else if(user.role === 2)
        {
          req.session.admin = 2;
        }
        
        if (req.session.returnURL) {
          
          res.redirect(req.session.returnURL);

        }
        else {
          if(user.role ===2)
          {
            res.redirect('admin/dashboard')
          }
          else res.redirect("/");
        }


      } else {
        res.render("signin", {
          message: "Incorrect Password!",
          type: "aler-danger",
        });
      }
    } else {
      res.render("signin", {
        message: "Username not exists or has be banned",
        type: "alert-danger",
      });
    }
  });
});

router.get("/register", async function (req, res) {
  res.render("register", { banner: 'Sign Up' });
});

router.post("/register", async function (req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = {
    Name: req.body.name,
    Email: req.body.email,
    Password: hash,
    Fullname: req.body.fullname,
    role: 0,
    check: 0
  };
  await userModel.add(user);
  let transporter = nodemailer.createTransport({ // config mail server
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'happycookcloud@gmail.com', //Tài khoản gmail vừa tạo
      pass: '1357abcd' //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  //rand = Math.floor((Math.random() * 100) + 54);
  //console.log("\n\n" + rand)
  host = req.get('host');
  link = "http://" + req.get('host') + "/verify?id=" + user.Name;
  // console.log(link);
  var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    from: 'Happy Cooking',
    to: user.Email,
    text: 'You recieved message from ',
    subject: "Activate an Happy Cooking account",
    html: "<h3>Hello, " + `${user.Name}` + "</h3><h4>We are very happy because you have signed up for Happy Cooking website,<br>Please Click on the button to verify your email.</h4><a style='background-color:mediumblue;color:white;text-decoration:none;padding:10px 20px;border-radius:5px; margin-left: 180px; margin-bot:10px' href=" + link + ">Verify</a><br><br><h2>-------------------------------------------------------------------------</h2><h5>This is email automatically sent from ThienNhiTam Team.<br>Please do not reply to this email.</h5>"
  }

  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log("err: " + err);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });
  // res.send('<script>alert("Please verify on email")</script>');
  // next();
  res.render("signin", { banner: 'Sign In' });
});
router.get('/verify', async function (req, res) {
  console.log(req.protocol + ":/" + req.get('host'));
  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    console.log(req.query.id);
    console.log("Domain is matched. Information is from Authentic email");
    await update1(req.query.id);
    console.log("email is verified");
    res.end("<h1>Email is been Successfully verified");

  }
  else {
    res.end("<h1>Request is from unknown source");
  }
});

router.get("/is-available", async function (req, res) {
  const emailuser = req.query.email;
  const email = await userModel.singleByEmail(emailuser);
  if (email == '') {
    return res.json(true);
  }
  res.json(false);
});


router.get("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }
    return res.redirect("signin");
  });
});
module.exports = router;
