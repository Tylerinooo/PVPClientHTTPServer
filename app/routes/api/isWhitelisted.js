/*

Given a HWID, returns if they are whitelisted or not.

Example json returned:

{
  "hwid": "hwid-passed-in",
  "isWhitelisted": 1
}

*/

var responseUtils = require(`../../.././helpers/response_utilities.js`);

module.exports = (app, passport, database) => {

    app.get(`/api/isWhitelisted`, (req, res) => {
        
        //?hwid=
        var hwid = req.query.hwid;

        database.query(`SELECT * FROM ${dbconfig.whitelisted_tbl} WHERE hwid = ${hwid}`, function (err, result, fields) {

            if (err) throw err;
            
            let toReturn = result[0];
            if(toReturn == undefined) {
                try {
                    toReturn = JSON.parse('{"hwid": "' + hwid + '", "isWhitelisted": "' + toReturn.isWhitelisted + '"}');
                }
                catch(e){
                    toReturn = JSON.parse('{"hwid": "undefined", "isWhitelisted": 0}');
                }
                responseUtils.success(res, toReturn);
                return;
            }
            responseUtils.success(res, toReturn);
        });
    });
}