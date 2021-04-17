var express = require('express');
var router = express.Router();

var db_config = require('../config/database.js');
var conn = db_config.init();

db_config.connect(conn);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res) {
  var sql = 'SELECT * FROM TEST_TABLE';
  conn.query(sql, function(err, rows, fields){
    if(err) console.log('query is not excuted. select fail\n' + err);
    else res.render('list', {title: 'List', list: rows});
  })

});
module.exports = router;
