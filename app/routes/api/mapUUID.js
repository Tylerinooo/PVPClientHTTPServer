/*

Insert HWID, UUID, and USERNAME into database if it doesn't exist.
If it does exist, update username and UUID for that given HWID.
TODO: Mutiple usernames / uuid per hwid
https://github.com/egold555/PVPClientHTTPServer/issues/5

*/


let responseUtils = require(`../../.././helpers/response_utilities.js`);
let dbconfig = require(`../../../config/database`);

module.exports = (app, passport, database) => {
    
    app.post(`/api/mapUUID`, (req, res) => {

        let uuid = req.body.uuid;
        let hwid = req.body.hwid;
        let username = req.body.username;

        //Query the database
        //Preform action on database
        //Insert HWID, UUID, and USERNAME into database if it doesn't exist.
        //If it does exist, update username and UUID.
        //TODO: Mutiple usernames / uuid per hwid
        //https://github.com/egold555/PVPClientHTTPServer/issues/5
        
        database.query(`REPLACE INTO ${dbconfig.usermap_tbl}(uuid, hwid, username) VALUES('` + uuid + `', '` + hwid + `', '` + username + `')`, function (err, result, fields) {

            //Proper way of doing it!
            //https://github.com/egold555/PVPClientHTTPServer/issues/6
            if (err) {
                responseUtils.error(`500 Error. See console.`);
                console.error(err);
                return;
            }
            responseUtils.success(res, `200 OK`);

        });
    });
    
}