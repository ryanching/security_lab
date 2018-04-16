# security_lab
CS132 Spring 2017 Security 

Group members: Katie Normandin, Ryan Ching, and Peter Griesmer

We all tried to improve the defenses associated with our server (on port 7020).

We added Helmet to add XSS and other protections. We added csurf to protect our server from CSRF attacks. We updated the sql queries to protect against sql injections.

Git: https://github.com/ryanching/security_lab.git


## Phase 2: Configuration
Before reading this README, please make sure you've completed the instructions on Prelab 2 Phase 1. As a reminder, that phase introduced you to the VM where your application will be running on. It was also during that phase where you've forked this directory.

This part is very important, and you should do this portion of the lab carefully to ensure that your server will be running smoothly (until some other group attacks it of course!).

In particular, there are two files that you'll want to configure: _config.js_ and _./db/create.sql_. At this point, however, if you have not yet received an email from us about your _username_, _password_, _database_, and _port #_, then you should **stop** and make sure you've obtained these credentials. If you know these credentials, great! Let's start.

### Configuring ./_config.js_
1. Navigate to __**line 12**__
> var PORT = PORT_NUMBER;

2. Change __**PORT_NUMBER**__ to the port number that you've received in our email.

3. Navigate to __**line 13**__
> var DB_CONNECT = 'mysql://USER_NAME:PASSWORD@localhost/DATABASE_NAME';

4. Change __**USER_NAME, PASSWORD, DATABASE_NAME**__ to the credentials that you've received in our email.


### Configuring _./db/create.sql_
1. Navigate to __**line 3**__
> set mysqlargs = "-h localhost -u USERNAME -pPASSWORD"

2. Change Change __**USER_NAME, PASSWORD**__ to the credentials that you've received in our email. **PLEASE NOTE THE LACK OF SPACING BETWEEN p and your PASSWORD.**

3. Navigate to __**lines 4, 8, 10, and 11**__
   * > line 4: set db = DATABASE_NAME
   * > line 8: DROP DATABASE DATABASE_NAME;
   * > line 10: CREATE DATABASE DATABASE_NAME;
   * > line 11: USE DATABASE_NAME;

   For each of these lines, change __**DATABASE_NAME**__ to the database name that you've received in your email.

### Populating the Database
1. Change directory to where _'db/create.sql'_  is.
2. Run the following command:
> mysql -u USER_NAME -pPASSWORD

   Use the credentials supplied in the email. Please take note, again, of the lack of spacing between 'p' and 'PASSWORD'. You should now be in a _mysql shell_.
3. Run the following command:
> source create.sql

4. To check if you're done, run
> SELECT * FROM User

   You should see 3 entries.

### Saving your Settings
In the event that your application has been hacked, you'll have to restart your application from scratch. If you don't want to go through the entire configuration process again, push all these changes to the forked repository. Then, whenever you've been attacked, restarting the application is a matter of just pulling from your git repo, and re-running the create.sql script.

### Running Your Application
1. Navigate back to the application project root.
2. Run
> npm install

   You might encounter some error messages by node, but for now let's ignore them. Check your node_modules directory, and if there are the following modules, you're set:

   * any-db
   * any-db-mysql  
   * body-parser  
   * consolidate
   * express  
   * express-session  
   * marked
   * morgan
   * serve-favicon
   * swig
   * underscore
3. Run
> node server.js

> chromium &

4. Navigate to 'localhost:PORT' where PORT is the port number you've configured previously.
