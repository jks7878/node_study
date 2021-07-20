// 익스프레스
const express = require('express');

// 미들웨어

// 프로젝트 라우터
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('./chat/chat', {
        title:'Chat'
    })
});

module.exports = router;

