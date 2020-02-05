/*

Given a HWID, returns if they are banned or not.

Example json returned:

{
  "hwid": "hwid-passed-in",
  "isBanned": 1
}

*/

var responseUtils = require(`../../.././helpers/response_utilities.js`);
let configdb = require(`../../.././config/database`);

module.exports = (app, passport, database) => {

    app.get(`/api/isBanned`, (req, res) => {
        
        //?hwid=
        var hwid = req.query.hwid;

        database.query(`SELECT * FROM ${dbconfig.banned_tbl} WHERE hwid = '` + hwid + `'`, function (err, result, fields) {
            if (err) throw err;
            
            var toReturn = result[0];
            if(toReturn == undefined) {
                try {
                    toReturn = JSON.parse('{"hwid": "' + hwid + '", "isBanned": "' + toReturn.isBanned + '"}');
                }
                catch(e){
                    toReturn = JSON.parse(`{"hwid": "undefined", "isBanned": 0}`);
                }
                responseUtils.success(res, toReturn);
                return;
            }
            responseUtils.success(res, toReturn);
        });
    });
}