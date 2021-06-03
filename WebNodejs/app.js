const express = require('express');
const exphbs = require('express-handlebars');
require('express-async-errors');
var bodyParser = require('body-parser');
const app = express();
const hbs_sections= require('express-handlebars-sections');
const session = require('express-session')
const helper = require('./Controllers/helper');
app.use(express.static(__dirname + '/public'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
 
  extname: '.hbs',
  layoutsDir: 'views/layouts',
  partialsDir: 'views/partials',
  helpers:{
  section: hbs_sections(),
   createStarList: helper.createStarList,
   createStar: helper.creatStar,
  }
}));

app.set('view engine', '.hbs');
app.use(require('./middlewares/locals.byteacher'));
app.use(require('./middlewares/locals.cate'));
app.use(require('./middlewares/locals.mdw'));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  cookie: { 
    // secure: true 
    httpOnly: true,
    maxAge: null
  },
  secret: 'SECRET_KEY',
  resave: false,
  saveUninitialized: false,
  
}));

// user Cart Controller
const Cart = require('./Controllers/cartController');

app.use((req,res,next)=>{

  var cart = new Cart(req.session.cart ? req.session.cart : {});
  req.session.cart = cart;
  res.locals.totalQuantity = cart.totalQuantity;

  res.locals.username = req.session.user ? req.session.user.username : '';
  res.locals.id = req.session.user ? req.session.user.id : null;
  res.locals.isLoggedIn = req.session.user ? true : false; 
  res.locals.teacher = req.session.teacher;
  res.locals.admin = req.session.admin;
  res.locals.isRegistered =  req.session.isRegistered
  // if(res.locals.admin)
  // {
  //   app.use('/admin',require('./routes/admin.route'));
  //   app.use('/admin/categories', require('./routes/admin.route'));
  // }
  // if(res.locals.teacher)
  // {
  //   app.use('/postcourse',require('./routes/postcourse.route'));
  // }
 
  
    
  next();
})

app.use('/cart',require('./routes/cart.route'))
app.use('/',require('./routes/index.route'));
app.use('/',require('./routes/account.route'));
app.use('/signin',require('./routes/account.route'));
app.use('/topic',require('./routes/category.route'));
app.use('/category',require('./routes/category.route'));
app.use('/info',require('./routes/info.route'));
app.use('/courses',require('./routes/course.route'));
app.use('/search',require('./routes/search.route'));

app.use('/video',require('./routes/viewvideo.route'));

app.use('/review',require('./routes/review.route'));
app.use('/postcourse',require('./routes/postcourse.route'));
app.use('/updatecourse',require('./routes/updatecourse.route'));
app.use('/admin',require('./routes/admin.route'));
app.use('/favorite',require('./routes/favorite.route'));
app.use('/listcourses',require('./routes/listcourse.route'));
app.use('/admin/categories', require('./routes/admin.route'));
app.use('/buy',require('./routes/buy.route'));
app.get('/test',(req,res)=>{
  res.render('test')
});


app.get("/:page", (req, res) => {
  var banner = {
    cart: 'Your Cart',
    // info:'Information',
    contact:'Contact Us',
    category:'Course Category',
    detailCourse:'Course Details',
    checkout:'Checkout',
    favorite:'List favorite courses',
    listcourses: "List My Courses",
    signup:'Sign Up',
    signin: 'Sign In'
  }
  var page = req.params.page;
  if(page=="postcourse" || page=="updatecourse")
  {
    res.render("erorr/404");
  }
  else
   res.render(page,{banner: banner[page]});
});
app.use('/',(req,res)=>{
  res.render('erorr/404');
});
// app.get("/info/:page",(req,res)=>{
//   var page = req.params.page;
  
//   res.render('info/'+page,{banner:'Information'});
// });

// app.use(function (req, res) {
//   res.render('erorr/404', {
//     layout: false
//   })
// });

// // default error handler, promise erorr, async erorr
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.render('erorr/500', {
//     layout: false
//   })
// })
const PORT = 3000;
app.listen(PORT, () => {
});