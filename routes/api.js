var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var addContact = require('../api/addContact.js');
var deleteContact = require('../api/deleteContact.js');
var fetchContact = require('../api/fetchContact.js');
var updateContact = require('../api/updateContact.js');
var sign = require('../api/sign.js');
var JWTSECRET = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';
var user=require('../model/user');

// /* GET users listing. */
// router.post('/add', add.addition);
var verifyTokenAPI=function(req,res,next){
    var authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
      token = authorizationHeader.split(' ')[1];
      // console.log('token .................',token);
      if (token) {
        jwt.verify(token, JWTSECRET, function(err, decoded) {
          if (err)return res.send({ status: false, message: 'Failed to authenticate token.' });
            user.findOne({_id: decoded.id}).then(function(res){
              if(!res || res=='')return res.send({ status: false, message: 'User not found.'});
              if(res){
                req.currentUser = res;
                return next();
              }
            }).catch(function(err){
              return res.send({ status: false, message: 'User not found OR Some error has been occured.'});
            });
        });
      }else {
        return res.send({ status: false, message: 'No token provided.' });
      }
    }
    else {
      return res.send({ status: false, message: 'authorization Header is not set.' });
    }
  };

router.post('/addContact',verifyTokenAPI,addContact.addContactMethod);
router.post('/fetchContact',verifyTokenAPI,fetchContact.fetchContactMethod);
router.post('/deleteContact',verifyTokenAPI,deleteContact.deleteContactMethod);
router.post('/updateContact',verifyTokenAPI,updateContact.updateContactMethod);
router.post('/signin',sign.signin);
router.post('/signup',sign.signup);
router.post('/signout',verifyTokenAPI,sign.signout);
router.get('/profile',verifyTokenAPI,sign.profile);


module.exports = router;