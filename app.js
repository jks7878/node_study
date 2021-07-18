const debug = require('debug')('app4');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
// Layout
const expressLayouts = require('express-ejs-layouts');
// cookie
const cookieParser = require('cookie-parser');
// Session
const session = require('express-session');

// router setting
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chat');

const app = express();

app.use(session({
  secret: "asdf",
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// express-ejs-layouts setting 
app.use(expressLayouts);
app.set('layout', 'layout');
app.set("layout extractScripts", true);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
app.set('port', process.env.port || 3000);
const server = app.listen(app.get('port'), function(){
  debug('Express server listening on port ' + server.address().port);
});
