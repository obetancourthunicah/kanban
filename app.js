var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);


function getApp(db){
    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(require('less-middleware')(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));

    //Manejador de sesiones
    var store = new MongoDBStore(
      {
        uri: 'mongodb://localhost:27017/sessions',
        collection: 'kanbanssn'
      });

    // Catch errors
    store.on('error', function(error) {
      assert.ifError(error);
      assert.ok(false);
    });

    app.use(require('express-session')({
      secret: 'the only truth about life is death',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge:1000*60*60*3 // 3 horas
        //maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        //maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month
        //maxAge: 1000 * 60 * 60 * 24 * 265 // 1 year
      },
      store: store
    }));
    //se injecta la base de datos a las rutas
    var routes = require('./routes/desktop')(db);
    var users = require('./routes/users')(db);
    var api = require('./routes/api')(db);
    var mob = require('./routes/mob')(db);


    if(app.get('env')==="development"){
        app.use(function(req,res,next){
            req.session.islogged = "true";
            next();
        });
    }
    //Manejo de Rutas

    app.use('/', routes);
    app.use('/mobile', mob);
    app.use('/api', api);
    app.use('/users', users);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

    return app;
}


module.exports = getApp;
