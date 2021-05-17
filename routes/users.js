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
  var list;
  conn.query(sql, function(err, rows, fields){
    if(err) console.log('query is not excuted. select fail\n' + err);
    else {
      res.render('./users/list', {title: 'List', list:rows});
    } 
  })

  router.post('/addUser', function(req, res) {
    var id = req.body.id;
    var pw = req.body.pw;
    var sql = 'INSERT INTO TEST_TABLE (USER_ID, USER_PW) VALUES (?, ?)';
    var params = [id, pw];
    conn.query(sql, params, function(err, result, fields){
      if(err){
        console.log(arr);
        res.status(500).send('Internal Server Error');
      }else{
        console.log('Add User Complete')
        res.send({result:true, msg:'등록되었습니다'});
      }
    })
  })

  router.post('/modUser', function(req, res){
    var no = req.body.no;
    var id = req.body.id;
    var pw = req.body.pw;
    var sql = 'UPDATE TEST_TABLE SET USER_ID = (?), USER_PW = (?) WHERE USER_NO = (?)';
    var params = [id, pw, no];
    conn.query(sql, params, function(err, result, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }else{
        console.log('Mod User Complete');
        res.send({result:true, msg:'수정되었습니다'});
      }
    })
  })

  router.post('/delUser', function(req, res){
    var no = req.body.no;
    var sql = 'DELETE FROM TEST_TABLE WHERE USER_NO = (?)';
    var params = [no];
    conn.query(sql, params, function(err, result, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }else{
        console.log('Delete User Complete');
        res.send({result:true, msg:'삭제되었습니다'});
      }
    })
  })
});
module.exports = router;
