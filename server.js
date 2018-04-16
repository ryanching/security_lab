/********************************************************************************/
/*										*/
/*	Main Server for Security Lab						*/
/*										*/
/********************************************************************************/

/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

var express = require("express");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");
var session = require("express-session");

//var csrf = require('csurf');

var consolidate = require("consolidate"); // Templating library adapter for Express
var swig = require("swig");
var http = require("http");
var marked = require("marked");
var helmet = require("helmet");
var logger = require("morgan");

var config = require("./config.js");
var sessionmanager = require("./session.js");
var profile = require("./profile.js");
var contributions = require("./contributions.js");
var benefits = require("./benefits.js");
var allocations = require("./allocations.js");
var memos = require("./memos.js");




/********************************************************************************/
/*										*/
/*	Setup routing using express						*/
/*										*/
/********************************************************************************/

function setup()
{
   var app = express();

   app.disable("x-powered-by");
   app.use(favicon(__dirname + "/app/assets/favicon.ico"));

   // uses helmet's xssFilter, hsts, and frameguard (as per helmet's default settings)
   app.use(helmet());

   // Disables client side caching
   app.use(helmet.noCache());

   // Sets content security policy to protect against injections
   app.use(helmet.contentSecurityPolicy({
     directives: {
       defaultSrc: ["'self'"],
       styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
     }
   }))

   app.use(helmet.xssFilter({setOnOldIE: true}));

   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: false }));

   app.use(session({ secret: config.COOKIE_SECRET,
		     saveUninitialized: true,
		     resave: true }));

//    app.use(csrf());
//    // Make csrf token available in templates
//    app.use(function(req, res, next) {
//       res.locals.csrftoken = req.csrfToken();
//       next();
//     });

   // Register templating engine
   app.engine(".html", consolidate.swig);
   app.set("view engine", "html");
   app.set("views", __dirname + "/app/views");

   app.use(express.static(__dirname + "/app/assets"));

   app.use(logger('combined'));

   // intialize marked library
   marked.setOptions({ });
   app.locals.marked = marked;

   var isAdmin = sessionmanager.isAdminUserMiddleware;
   app.get("/", sessionmanager.displayWelcomePage);

   app.get("/login", sessionmanager.displayLoginPage);
   app.post("/login", sessionmanager.handleLoginRequest);

   app.get("/signup", sessionmanager.displaySignupPage);
   app.post("/signup", sessionmanager.handleSignup);

   // Logout page
   app.get("/logout", sessionmanager.displayLogoutPage);

   // Handle redirect for learning resources link
   app.get("/tutorial", function(req, res, next) {
	      return res.render("tutorial/a1");
	    });
   app.get("/tutorial/:page", function(req, res, next) {
	      return res.render("tutorial/" + req.params.page);
	    });

   // anything below here requires login
   app.use(sessionmanager.isLoggedInMiddleware);

   // The main page of the app
   app.get("/dashboard", sessionmanager.displayWelcomePage);

   // Profile page
   app.get("/profile", profile.displayProfile);
   app.post("/profile", profile.handleProfileUpdate);

    // Contributions Page
   app.get("/contributions", contributions.displayContributions);
   app.post("/contributions", contributions.handleContributionsUpdate);

   // Benefits Page
   app.get("/benefits", benefits.displayBenefits);
   app.post("/benefits", benefits.updateBenefits);

   // Allocations Page
   app.get("/allocations/:userId", allocations.displayAllocations);

   // Memos Page
   app.get("/memos", memos.displayMemos);
   app.post("/memos", memos.addMemos);

   // Handle redirect for learning resources link
   app.get("/learn", function(req, res, next) {
	      return res.redirect(req.query.url);
	    });

   // Error handling middleware
   app.use(errorHandler);

   // Template system setup
   swig.setDefaults({
	 autoescape: false
    });

   var port = 8080//config.PORT;
   var server = app.listen(port);

   console.log("Listening on " + port);
}




/********************************************************************************/
/*										*/
/*	Handle errors								*/
/*										*/
/********************************************************************************/

function errorHandler(err,req,res,next)
{
   console.log(err.message);
   console.log(err.stack);
   res.status(500);
   res.render("error-template", { error : err } );
}



/********************************************************************************/
/*										*/
/*	Main program								*/
/*										*/
/********************************************************************************/

setup();




/* end of server.js */
