var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var JWTSECRET = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';
var user=require('../model/user');
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/', function(req, res, next) {
//   res.render('login', { title: 'login page' });
// });



var verifyToken=function(req,res,next){
    if(req.cookies.jwtToken){
      token = req.cookies.jwtToken[0];
      tokenStatus	=req.cookies.jwtToken[1];
      if (tokenStatus && token && token!=undefined) {
        if (!token)return res.redirect('/');
        jwt.verify(token,JWTSECRET, function(err, decoded) {
          if (err)return res.redirect('/');
            user.findOne({_id: decoded.id}).then(function(res){
              if(res==null || res=='')return res.redirect('/');
              if(res){
                req.currentUser = res;
                // console.log('req.currentUser',req.currentUser.publickey);
                return next();
              }
            }).catch(function(err){
              return res.redirect('/');
            });
        });
      }
      else {
        return res.redirect('/');
      }
    }else {
      return res.redirect('/');
    }
  };

  

router.get('/', function(req, res, next) {
      res.render('signin', { title: '' });
    });

router.get('/signup', function(req, res, next) {
        res.render('signup', { title: '' });
      });

router.get('/home',verifyToken, function(req, res, next) {
        res.render('contactList', { title: '' });
      });

router.get('/profile',verifyToken, function(req, res, next) {
        res.render('profile', { title: '' });
      });

  module.exports = router;