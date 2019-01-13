require('dotenv').config();
var express = require('express');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/task');
var groupRouter = require('./routes/group');
var cors =require('cors');
var app = express();
var mongoose=require('mongoose');

//connect to mongo instance db
mongoose.connect(process.env.DB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to mongo db')
});
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/tasks', taskRouter);
app.use('/groups', groupRouter);

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
});

module.exports = app;
