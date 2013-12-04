
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , hbs = require('hbs')
  , mongo = require('mongo')
  , stylus = require('stylus')
  , socketio = require('socket.io')
  

var app = express();
var blogEngine = require('./blog');

app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/api', function(req,res) {
   response.send({name:"BEshape", age:"25"});
});
app.get('/home', function(req,res) {
   res.render('home', {title: "My Blog", entries:blogEngine.getBlogEntries()});
});
app.get('/about', function(req, res) {
   res.sendfile('./views/about.html');
});
app.get('/how', function(req, res) {
   res.sendfile('./views/how.html');
});
app.get('/appetizers', function(req, res) {
   res.sendfile('./views/appetizers.html');
});
app.get('/pho', function(req, res) {
   res.sendfile('./views/pho.html');
});
app.get('/ricebowls', function(req, res) {
   res.sendfile('./views/ricebowls.html');
});
app.get('/sandwhiches', function(req, res) {
   res.sendfile('./views/sandwhiches.html');
});

app.get('/specialties', function(req, res) {
   res.sendfile('./views/specialties.html');
});
app.get('/wok', function(req, res) {
   res.sendfile('./views/wok.html');
});
app.get('/article/:id', function(req, res) {
   var entry = blogEnginde.getBlogEntry(req.params.id);
   res.render('article', {title:entry, blog:entry});
});
app.get('/faq', function(req, res) {
   res.sendfile('./views/faq.html');
});
app.get('/contact', function(req, res) {
   res.sendfile('./views/contact.html');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
