/*

    I honestly didn't touch this file cuz i dont understand anything thats going on here lmfao
    who ever wants to clean it up can 

    - Tyler

 */

let LocalStrategy = require(`passport-local`).Strategy;

let mysql = require(`mysql`);
let bcrypt = require(`bcrypt-nodejs`);
let dbconfig = require(`.././config/database`);
let connection = mysql.createConnection(dbconfig.connection);

connection.query(`USE ${dbconfig.database}`);

module.exports = (passport) => {

    passport.serializeUser(({ id }, done) => {
        done(null, id);
    });

    passport.deserializeUser((id, done) => {
        connection.query(`SELECT * FROM ${dbconfig.users_tbl} WHERE id = ? `, [id], (err, rows) => {
            done(err, rows[0]);
        });
    });

    passport.use(
        `local-signup`,
        new LocalStrategy({
            usernameField: `username`,
            passwordField: `password`,
            passReqToCallback: true,
        }, (req, username, password, done) => {
            connection.query(`SELECT * FROM ${dbconfig.users_tbl} WHERE username = ?`, [username], (err, { length }) => {
                if (err) return done(err);
                if (length) {
                    return done(null, false, req.flash(`signupMessage`, `That username is already taken.`));
                } else {
                    let newUserMysql = {
                        username,
                        password: bcrypt.hashSync(password, null, null),
                    };

                    let insertQuery = `INSERT INTO ${dbconfig.users_tbl} ( username, password ) values (?,?)`;

                    connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], (err, { insertId }) => {
                        newUserMysql.id = insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    passport.use(
        `local-login`,
        new LocalStrategy({
            usernameField: `username`,
            passwordField: `password`,
            passReqToCallback: true,
        }, (req, username, password, done) => {
            connection.query(`SELECT * FROM ${dbconfig.users_tbl} WHERE username = ?`, [username], (err, rows) => {
                if (err) return done(err);
    
                if (!rows.length) return done(null, false, req.flash(`loginMessage`, `No user found.`));
                
                if (!bcrypt.compareSync(password, rows[0].password)) return done(null, false, req.flash(`loginMessage`, `Oops! Wrong password.`));

                return done(null, rows[0]);
            });
        })
    );
};
