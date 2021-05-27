var express = require('express');
var router = express.Router();

var db_config = require('../config/database.js');
var conn = db_config.init();

db_config.connect(conn);

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Pagination Start
  var curPage = 1;
  var maxPage;
  var limit = 5;
  if(req.query.page != null || req.query.page != 0){
    curPage = req.query.page;
  }
  console.log(curPage);
  var startNum;
  var endNum;

  var sql = 'SELECT COUNT(*) AS CNT FROM TEST_TABLE';
  conn.query(sql, function(err, rows, fields){
    if(err) console.log('query is not excuted. select fail\n' + err);
    else {
      var cnt = rows[0].CNT;
      console.log("count : " + cnt);
      if(cnt != 0 && cnt <= 5){
        maxPage = 1
      }else if(cnt != 0 && cnt > 5){
        maxPage = 1 + Math.floor(cnt/limit);
      }
    } 
    console.log("max page : " + maxPage);

    startNum = (curPage * limit) - limit + 1;
    endNum = startNum + limit;
    console.log("start : " + startNum);
    console.log("end : " + endNum);
    // Pagination End

    sql = 
    'SELECT * FROM(SELECT @ROWNUM:=@ROWNUM+1 RNUM, A.* FROM TEST_TABLE A, (SELECT @ROWNUM:=0) B)LIST WHERE RNUM>= (?) and RNUM < (?)';
    var params = [startNum, endNum];
    conn.query(sql, params, function(err, rows, fields){
      if(err) console.log('query is not excuted. select fail\n' + err);
      else {
        res.render('./users/list', {title: 'List', list:rows, curPage, maxPage});
      } 
    })
  })
})

router.get('/jsonList', function(res){
  var sql = 'SELECT * FROM TEST_TABLE';
  conn.query(sql, function(err, rows, fields){
    if(err) console.log('query is not excuted. select fail\n' + err);
    else {
     return res.json({list:rows});
    } 
  })
})

router.get('/search/:id', function(req, res){
  var sql = 'SELECT * FROM TEST_TABLE WHERE USER_ID = (?)'
  var params = [req.params.id];
  console.log(req.params.id);
  conn.query(sql, params, function(err, rows, fields){
    if(err) console.log('query is not excuted. select fail\n' + err);
    else {
     return res.json({list:rows});
    } 
  })
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

module.exports = router;
