const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
const router = express.Router();
const userModel = require("../seeders/User");
const cateModel = require("../seeders/Category");
const TopicModel = require("../seeders/Topic");
const CourseModel = require("../seeders/Course");
const config = require("../config/default.json");
const {
  update1,
  lockstudent,
  lockteacher,
  unlockstudent,
  unlockteacher,
} = require("../seeders/User");
const { lockcourse, unlockcourse } = require("../seeders/Course");
const session = require("express-session");

router.get("/dashboard", async function (req, res) {
  if (req.session.admin) res.render("admin/dashboard");
  else res.render("erorr/404");
});
router.get("/student", async function (req, res) {
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limituser;

  const [total, rows] = await Promise.all([
    await userModel.countStudent(),
    await userModel.allbyStudent(offset),
  ]);
  const sum = total[0].total;
  const nPages = Math.ceil(sum / config.pagination.limituser);
  const page_items = [];
  for (i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }
  if (req.session.admin) {
    res.render("admin/Student/Student", {
      user: rows[0],
      empty: rows[0].length === 0,
      page_items: page_items,
      can_go_prev: page > 1,
      can_go_next: page < nPages,
      prev_value: page - 1,
      next_value: page + 1,
    });
  } else {
    res.render("erorr/404");
  }
});

router.get("/lockstudent", function (req, res) {
  if (req.session.admin) {
    lockstudent(req.query.id);
    res.redirect("/admin/student");
  } else {
    res.render("erorr/404");
  }
});
router.get("/unlockstudent", function (req, res) {
  if (req.session.admin) {
    unlockstudent(req.query.id);
    res.redirect("/admin/student");
  } else {
    res.render("erorr/404");
  }
});

router.get("/teacher", async function (req, res) {
  const page = +req.query.page || 1;
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limituser;
  // const total = courseModel.count();
  // const rows = await courseModel.allbypage(offset);
  const [total, rows] = await Promise.all([
    await userModel.countTeacher(),
    await userModel.allbyTeacher(offset),
  ]);
  const sum = total[0].total;
  const nPages = Math.ceil(sum / config.pagination.limituser);
  const page_items = [];
  for (i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }
  if (req.session.admin) {
    res.render("admin/Teacher/Teacher", {
      user: rows[0],
      empty: rows[0].length === 0,
      page_items: page_items,
      can_go_prev: page > 1,
      can_go_next: page < nPages,
      prev_value: page - 1,
      next_value: page + 1,
    });
  } else {
    console.log(!req.session.admin);
    res.render("erorr/404");
  }

  // const rows = await userModel.allTeacher();

  // res.render('admin/Teacher/Teacher', {
  //   user: rows[0],
  //   empty: rows[0].length === 0
  // });
  //console.log(rows);
});
router.get("/addteacher", function (req, res) {
  if (!req.session.admin) {
    res.render("erorr/404");
  } else res.render("admin/Teacher/addTeacher");
});
router.post("/addteacher", async function (req, res) {
  const hash = bcrypt.hashSync(req.body.name, 10);
  const user = {
    Name: req.body.name,
    Email: req.body.email,
    Password: hash,
    Fullname: req.body.fullname,
    role: 1,
    check: 0,
  };

  await userModel.add(user);

  let transporter = nodemailer.createTransport({
    // config mail server
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "academynhom6@gmail.com", //Tài khoản gmail vừa tạo
      pass: "1357abcd", //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  //rand = Math.floor((Math.random() * 100) + 54);
  //console.log("\n\n" + rand)
  host = req.get("host");
  link = "http://" + req.get("host") + "/admin/verify?id=" + user.Name;
  console.log(link);
  var mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: "Online Academy",
    to: user.Email,
    text: "You recieved message from ",
    subject: "Activate an Online Academy account",
    html:
      "<h3>Hello, " +
      `${user.Fullname}` +
      "</h3><h4>We are very happy because you have signed up for online Academy website. Please do not grant this account to anyone!<br> This is your teacher account. After logging in, please change your password <h4 style='color:red'> -Username: " +
      `${user.Name}` +
      "<br>-Password: " +
      `${user.Name}` +
      "</h4><br>Please Click on the button to verify your email.<br></h4><a style='background-color:mediumblue;color:white;text-decoration:none;padding:10px 20px;border-radius:5px; margin-left: 180px; margin-bot:10px' href=" +
      link +
      ">Verify</a><br><br><h2>-------------------------------------------------------------------------</h2><h5>This is email automatically sent from ThienNhiTam Team.<br>Please do not reply to this email.</h5>",
  };

  transporter.sendMail(mainOptions, function (err, info) {
    if (err) {
      console.log("err: " + err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
  res.redirect("/admin/teacher");
});
router.get("/verify", async function (req, res) {
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    console.log(req.query.id);
    console.log("Domain is matched. Information is from Authentic email");
    await update1(req.query.id);
    console.log("email is verified");
    res.end("<h1>Email is been Successfully verified");
  } else {
    res.end("<h1>Request is from unknown source");
  }
});
router.get("/is-available", async function (req, res) {
  const username = req.query.user;
  const user = await userModel.singleByUserName(username);
  if (user == "") {
    return res.json(true);
  }
  res.json(false);
});
// router.get("/delteacher", async function (req, res) {
//   console.log(req.query.user);
//   await delTeacher(req.query.user);
//   res.redirect("/admin/teacher");
// });
router.get("/lockteacher", async function (req, res) {
  if (req.session.admin) {
    lockteacher(req.query.id);
    res.redirect("/admin/teacher");
  } else {
    res.render("erorr/404");
  }
});
router.get("/unlockteacher", async function (req, res) {
  unlockteacher(req.query.id);
  res.redirect("/admin/teacher");
});
router.get("/category", async function (req, res) {
  if (!req.session.admin) {
    res.render("erorr/404");
  } else {
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limituser;
    // const total = courseModel.count();
    // const rows = await courseModel.allbypage(offset);
    const [total, rows] = await Promise.all([
      await cateModel.countCategory(),
      await cateModel.allbyCategory(offset),
    ]);
    const sum = total[0].total;
    const nPages = Math.ceil(sum / config.pagination.limituser);
    const page_items = [];
    for (i = 1; i <= nPages; i++) {
      const item = {
        value: i,
        isActive: i === page,
      };
      page_items.push(item);
    }
    res.render("admin/Category/Category", {
      category: rows[0],
      empty: rows[0].length === 0,
      page_items: page_items,
      can_go_prev: page > 1,
      can_go_next: page < nPages,
      prev_value: page - 1,
      next_value: page + 1,
    });
  }

  // const rows = await cateModel.all();

  // res.render('admin/Category/Category', {
  //   category: rows[0],
  //   empty: rows[0].length === 0
  // });
});

router.get("/deletecourse", async function (req, res) {
  if (req.session.admin) {
    const id = req.query.id;
    await CourseModel.delete(id);
    return res.redirect("/admin/course");
  } else {
    res.render("erorr/404");
  }
  //console.log(rows);
});
router.get("/cate", async function (req, res) {
  const cate = req.query.cate;
  const rows = await TopicModel.allCate(cate);

  res.render("admin/Category/Topic", {
    topic: rows[0],
    empty: rows[0].length === 0,
  });
  //console.log(rows);
});
router.get("/addcategory", function (req, res) {
  if (req.session.admin) {
    res.render("admin/Category/addCategory");
  } else res.render("erorr/404");
});

router.post("/addcategory", async function (req, res) {
  await cateModel.add(req.body.namecategory);
  // console.log(ret);
  // res.send('OK');
  res.render("admin/Category/addCategory");
});
router.get("/catego/:id", async function (req, res) {
  const id = req.params.id;
  const category = await cateModel.single(id);
  if (category === null) {
    return res.redirect("/admin/category");
  }
  res.render("admin/category/editCategory", {
    cate: category[0],
  });
});
router.get("/topi/:id", async function (req, res) {
  const id = req.params.id;
  const topic = await TopicModel.single(id);
  if (topic === null) {
    return res.redirect("/admin/category");
  }
  res.render("admin/category/editTopic", {
    topic: topic[0],
  });
});

router.post("/del", async function (req, res) {
  const ret = await cateModel.del(req.body);
  res.redirect("/admin/category");
});

router.post("/patch", async function (req, res) {
  const ret = await cateModel.patch(req.body);

  res.redirect("/admin/category");
});
router.post("/topicsdel", async function (req, res) {
  const ret = await TopicModel.del(req.body);
  const name = req.body.categoryid;
  res.redirect("/admin/category");
});

router.post("/topicspatch", async function (req, res) {
  const ret = await TopicModel.patch(req.body);
  //console.log(ret);
  res.redirect("/admin/category");
});
router.get("/addtopic", async function (req, res) {
  if (req.session.admin) {
    const topi = req.query.topi;
    //console.log(cate);
    const cate = req.query.cate;
    res.render("admin/Category/addTopic", {
      topi: topi,
      cate: cate,
    });
  } else {
    res.render("erorr/404");
  }
});
router.post("/addtopic", async function (req, res) {
  if (req.session.admin) {
    const topic = {
      Id: req.body.id,
      Name: req.body.nametopic,
    };

    const t = await TopicModel.add(topic);
    res.redirect("/admin/category");
  } else {
    res.render("erorr/404");
  }
});
router.get("/info", async function (req, res) {
  if (req.session.admin) {
    res.render("admin/infoAdmin", { banner: "Admin account" });
  } else {
    res.render("erorr/404");
  }
});
router.get("/allbyteacher", async function (req, res) {
  if (!req.session.admin) {
    res.render("erorr/404");
  } else {
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limituser;
    // const total = courseModel.count();
    // const rows = await courseModel.allbypage(offset);
    const [total, rows] = await Promise.all([
      await CourseModel.count(),
      await CourseModel.all(offset),
    ]);
    const sum = total[0].total;
    const nPages = Math.ceil(sum / config.pagination.limituser);
    const page_items = [];
    for (i = 1; i <= nPages; i++) {
      const item = {
        value: i,
        isActive: i === page,
      };
      page_items.push(item);
    }
    res.render("admin/Course/coursebyteacher", {
      course: rows[0],
      empty: rows[0].length === 0,
      page_items: page_items,
      can_go_prev: page > 1,
      can_go_next: page < nPages,
      prev_value: page - 1,
      next_value: page + 1,
    });
  }
});
router.get("/byteacher/:teacherid", async function (req, res) {
  const page = +req.query.page || 1;
  const id = +req.params.teacherid;
  for (const c of res.locals.lcTeachers) {
    if (c.id === +id) {
      c.isActive = true;
    }
  }
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  // const total = courseModel.count();
  // const rows = await courseModel.allbypage(offset);
  const [total, rows] = await Promise.all([
    await CourseModel.countbyteacher(id),
    await CourseModel.pagebyteacher(id, offset),
  ]);
  const sum = total[0].total;
  const nPages = Math.ceil(sum / config.pagination.limit);
  const page_items = [];
  for (i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }
  res.render("admin/Course/coursebyteacher", {
    course: rows[0],
    empty: rows[0].length === 0,
    page_items: page_items,
    can_go_prev: page > 1,
    can_go_next: page < nPages,
    prev_value: page - 1,
    next_value: page + 1,
  });
});
router.get("/allbytopic", async function (req, res) {
  if (!req.session.admin) {
    res.render("erorr/404");
  } else {
    const page = +req.query.page || 1;
    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;
    // const total = courseModel.count();
    // const rows = await courseModel.allbypage(offset);
    const [total, rows] = await Promise.all([
      await CourseModel.count(),
      await CourseModel.allbypage(offset),
    ]);
    const sum = total[0].total;
    const nPages = Math.ceil(sum / config.pagination.limit);
    const page_items = [];
    for (i = 1; i <= nPages; i++) {
      const item = {
        value: i,
        isActive: i === page,
      };
      page_items.push(item);
    }
    res.render("admin/Course/coursebycategory", {
      course: rows[0],
      empty: rows[0].length === 0,
      page_items: page_items,
      can_go_prev: page > 1,
      can_go_next: page < nPages,
      prev_value: page - 1,
      next_value: page + 1,
    });
  }
});
router.get("/bytopic/:categoryid/:topicid", async function (req, res) {
  const page = +req.query.page || 1;
  const id = +req.params.topicid;
  const caid = +req.params.categoryid;
  for (const c of res.locals.lcCategories) {
    if (c.id === caid) {
      for (const d of c.level2) {
        if (d.id === id) {
          d.isActive = true;
          console.log(d);
        }
      }
    }
  }
  if (page < 0) page = 1;
  const offset = (page - 1) * config.pagination.limit;
  // const total = courseModel.count();
  // const rows = await courseModel.allbypage(offset);
  const [total, rows] = await Promise.all([
    await CourseModel.countbytopic(id),
    await CourseModel.pagebytopic(id, offset),
  ]);
  const sum = total[0].total;
  const nPages = Math.ceil(sum / config.pagination.limit);
  const page_items = [];
  for (i = 1; i <= nPages; i++) {
    const item = {
      value: i,
      isActive: i === page,
    };
    page_items.push(item);
  }
  res.render("admin/Course/coursebycategory", {
    course: rows[0],
    empty: rows[0].length === 0,
    page_items: page_items,
    can_go_prev: page > 1,
    can_go_next: page < nPages,
    prev_value: page - 1,
    next_value: page + 1,
  });
});
router.get("/lockcourse1", function (req, res) {
  if (req.session.admin) {
    lockcourse(req.query.id);
    res.redirect("/admin/allbyteacher");
  } else {
    res.render("erorr/404");
  }
});
router.get("/unlockcourse1", function (req, res) {
  if (req.session.admin) {
    unlockcourse(req.query.id);
    res.redirect("/admin/allbyteacher");
  } else {
    res.render("erorr/404");
  }
});
router.get("/lockcourse2", function (req, res) {
  if (req.session.admin) {
    lockcourse(req.query.id);
    res.redirect("/admin/allbytopic");
  } else {
    res.render("erorr/404");
  }
});
router.get("/unlockcourse2", function (req, res) {
  if (req.session.admin) {
    unlockcourse(req.query.id);
    res.redirect("/admin/allbytopic");
  } else {
    res.render("erorr/404");
  }
 
});
module.exports = router;
