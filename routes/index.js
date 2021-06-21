var express = require('express');
var router = express.Router();
const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

/* GET home page. */

let favorite;
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', favorite: req.cookies.favorite});
});
router.post('/', function(req, res, next) {
  favorite = req.body.favorite;
  res.cookie('favorite', favorite,{
    maxAge: 30000
  });
  res.redirect('/');
});

module.exports = router;
