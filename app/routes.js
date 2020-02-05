/*

Handles the "registration" of the routes.

It also connects to the database, and handels logging into the admin page currently. TBD if I should move this

*/

const mysql = require(`mysql`);
const dbconfig = require(`../config/database`);
const connection = mysql.createConnection(dbconfig.connection);
connection.query(`USE ${dbconfig.database}`);

module.exports = (app, passport) => {

    //"Register" all of our api links
    require(`./routes/api/cosmetics.js`)(app, passport, connection);
    require(`./routes/api/globalSettings.js`)(app, passport, connection);
    require(`./routes/api/mapUUID.js`)(app, passport, connection);
    require(`./routes/api/isBanned.js`)(app, passport, connection);
    require(`./routes/api/isWhitelisted.js`)(app, passport, connection);
    require(`./routes/api/getUsername.js`)(app, passport, connection);
    require(`./routes/api.js`)(app, passport, connection);
    
    //Home sweet home
    app.get(`/`, (req, res) => {
        res.render(`index.ejs`); // load the index.ejs file
    });

    /**
     * I removed the login code n that by Eric until he makes it 100% working!
     * If you would like to make it yourself go ahead!
     * if you want it on here then contact me via discord (Tylerino#6334) and 
     * send me the code and if i think it's good then i'll put it in this repository!
    */
}