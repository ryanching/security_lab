/********************************************************************************/
/*										*/
/*	Configuration parameters for security lab server			*/
/*										*/
/********************************************************************************/

var _ = require("underscore");
var path = require("path");

var finalEnv = process.env.NODE_ENV || "development";

var PORT = 7020;
var DB_CONNECT = 'mysql://group21:group21_pw@localhost/group21_db';
var COOKIE_SECRET = "SessionCookieSecretKey";
var HOSTNAME = "localhost";




/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/


exports.PORT = PORT;
exports.DB_CONNECT = DB_CONNECT;
exports.COOKIE_SECRET = COOKIE_SECRET;
exports.HOSTNAME = HOSTNAME;




/* end of config.js */
