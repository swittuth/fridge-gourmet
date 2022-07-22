const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const keys = require("./keys");
const db = require("../models/food_database");

passport.serializeUser((user, done) => {
  // grab the user identification - can be google id or any id from the db
  // this id will be the id we associate with on our application
  // null is taken if there is an error
  done(null, user.id); // attach to the cookie and make sure it's only a day long and the browser will receive that cookie
  // this happens when the user login
});

passport.deserializeUser(async (id, done) => {
  // cookie comes back with an id and our job is to find out who has that id in the database
  // deserialize the id to the person's name or identification
  const value = [id];
  const sqlFind = "SELECT * FROM users WHERE id = $1";
  const result = await db.query(sqlFind, value);
  const user = result.rows[0];
  done(null, user); // attach the user property to the request so that we can handle in the route handler
});

passport.use(
  new GoogleStrategy(
    {
      // options for the strategy
      // passed later on during configuration
      // use google plus api to authenticate people
      // using google api behind the scene
      // need client id and client secret
      clientID: keys.google.clientID,
      callbackURL: "/auth/google/redirect",
      clientSecret: keys.google.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // accessToken can be used by our application to go back to google to get the data
      // profile is the information that passport gets from google and bring back to the developer
      // done is called when we are done with this callback function

      // check if the user already exists in the database
      const sqlFind = "SELECT * FROM users WHERE id = $1";
      const valuesFind = [profile.id];
      const findResult = await db.query(sqlFind, valuesFind);

      if (findResult.rows.length === 0) {
        // if the user doesn't exist
        const valuesInsert = [profile.id, profile.displayName];
        const sqlInsert = "INSERT INTO users VALUES ($1, $2)";
        const result = await db.query(sqlInsert, valuesInsert);
        // NEED TO CONSOLE LOG THE RESULT TO WAIT WHAT THIS IS
        done(null, { id: profile.id, name: profile.displayName });
      } else {
        done(null, findResult.rows[0]);
      }
    }
  )
);
