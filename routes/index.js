var express = require('express');
var router = express.Router();

const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  if(req && req.session && req.session.count) {
    console.log(req.session.count);
    res.render('index', { 
      title: 'Express', 
      favorite: req.cookies.favorite,
      count: req.session.count
    });
  }else{
    req.session.count = 1;
    res.redirect('/');
  }
});

// cookie
let favorite;
router.post('/cookie', function(req, res, next) {
  favorite = req.body.favorite;
  res.cookie('favorite', favorite,{
    maxAge: 30000
  });
  res.redirect('/');
});

module.exports = router;
