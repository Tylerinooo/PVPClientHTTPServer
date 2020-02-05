/*

Prints out Json of every users cosmetics from the database
Example:
[
  {
    "uuid": "575973e5-e497-3cb3-bb63-d114ffcff0b1",
    "cape_style": null,
    "hat": {
      "enabled": 0,
      "r": 255,
      "g": 0,
      "b": 255
    },
    "googly_eyes": 1
  },
  {
    "uuid": "575973e5-e497-3cb3-bb63-d114ffcff0b2",
    "cape_style": "smiley_face",
    "hat": {
      "enabled": 0,
      "r": 0,
      "g": 0,
      "b": 0
    },
    "googly_eyes": 1
  }
]


Use JS objects as json blocks, see hat for example

*/

let responseUtils = require(`../../.././helpers/response_utilities.js`);
let dbconfig = require(`../../.././config/database`);

module.exports = (app, passport, database) => {

    app.get(`/api/cosmetics`, (req, res) => {

      database.query(`SELECT * FROM ${dbconfig.cosmetics_tbl}`, function (err, rows, fields) {
          if (err) throw err;

          var objs = [];

          for (var i = 0; i < rows.length; i++) {
              
              var row = rows[i];
              var hat = new Object();
              
              hat.enabled = row.hat_enabled;
              hat.r = row.hat_color_r;
              hat.g = row.hat_color_g;
              hat.b = row.hat_color_b;

              objs.push({
                  uuid: row.uuid,
                  cape_style: row.cape_style,
                  hat: hat,
                  googly_eyes: row.googly_eyes
              });
          }

          responseUtils.success(res, JSON.stringify(objs));
      });
  });
}
