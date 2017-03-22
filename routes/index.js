var express = require('express');
var moment = require('moment');
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')

const db = low('db.json', {
  storage: fileAsync
})

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/user/:name', function(req, res) {
	const uInfo = db.get('users').find({name: req.params.name}).value();
	// console.log('uinfo '+JSON.stringify(uInfo));
	console.log('uinfo :: '+uInfo.name);
  	res.render('view', { uInfo: uInfo });
});

router.get('/list', function(req, res) {
	const uList = db.get('users').value();
	// console.log('uList :: '+JSON.stringify(uList));
	console.log('uList :: '+uList.length);
	res.render('list', { uList: uList });
});

router.post('/', function(req, res){
	// console.log('res.body :: '+req.body.name);
	// console.log('res.body :: '+req.body.contact);
	// console.log('res.body :: '+req.body.address);
	// console.log('res.body :: '+req.body.email);
	// console.log('res.body :: '+req.body.msg);
	// console.log('res.body :: '+req.body.signature);
	db.get('users').push(req.body).last().assign({createdAt: moment().format()}).write();
	// res.json(req.body);
	res.redirect('/user/'+req.body.name);
});

module.exports = router;
