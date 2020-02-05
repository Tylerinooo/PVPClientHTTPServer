/*

Mojang has a limit of one request per min to transform a UUID into a username, or viece versa. So, we are implementing our own cashing database
You pass in a UUID, and it returns you the username

*/


let responseUtils = require(`../../.././helpers/response_utilities.js`);

module.exports = (app, passport, database) => {
    
    app.get(`/api/getUsername`, (req, res) => {

        //?uuid=
        var uuid = req.query.uuid;

        database.query(`SELECT * FROM ${dbconfig.usermap_tbl} WHERE uuid = '` + uuid + `'`, function (err, result, fields) {
            if (err) throw err;
            
            let toReturn = result[0];

            if(toReturn == undefined) {
                responseUtils.notFound(res, `User not found!`);
                return;
            }
            
            delete toReturn.hwid;
            delete toReturn.updated_time;

            responseUtils.success(res, toReturn);
        });
    });
}