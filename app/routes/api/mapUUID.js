module.exports = (app, passport, database) => {
    
    app.post('/api/mapUUID', (req, res) => {
        //INSERT INTO `clientusers` (`id`, `uuid`, `hwid`, `username`, `updated_time`) VALUES (NULL, 'uuid', 'hwid', 'username', NOW());
        var uuid = req.body.uuid;
        var hwid = req.body.hwid;
        var username = req.body.username;

        database.query("REPLACE INTO usermap(uuid, hwid, username) VALUES('" + uuid + "', '" + hwid + "', '" + username + "')", function (err, result, fields) {

            if (err) {
                throw err;
            }

            console.log(uuid + " - " + hwid + " - " + username);
            res.send(result);

        });

        console.log(uuid + " " + hwid + " " + username);
    });
    
}