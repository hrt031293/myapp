const mongodb = require('mongodb');
const mongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var contact = require('../model/contact');
var jwt = require('jsonwebtoken');
var JWTSECRET = '0x61B8DE7A093325542486910D0463983ffb6E65Aa';
var user=require('../model/user');


var signup=((req,res,next)=>{
var log = new user({
    email:req.body.email,
    password:req.body.password,
    name:req.body.name,
    cpassword:req.body.cpassword
});
user.findOne({email:log.email}).then((response)=>{
    console.log(response);
    if(!response){
        if(log.password === log.cpassword){
        log.save().then((doc)=>{
            
            if(doc){
            res.send({status:true,message:'user saved'});
            }else{
                res.send({status:false,message:'user not saved'});
            }
        },(e)=>{
            res.send({status:false,message:'error occured while saving'});
        });
    }else{
        res.send({status:false,message:'password not matched'});
    }}else{
        res.send({status:false,message:'email already exists'});
    }},(e)=>{
    res.send({status:false,message:'error'});
    });
});



var signin=((req,res,next)=>{
    var log = {
        email: req.body.email,
        password: req.body.password
    };
//console.log(log);
user.findOne({email:log.email})
.then((doc)=>{
   console.log('doc',doc);
   if(doc!=null){
       // console.log('password',doc.password);
       // console.log('logpassword',log.password);
       if(doc.password==log.password){ 
           var token = jwt.sign({ id: doc._id },JWTSECRET);
               res.cookie('jwtToken',[token,true]);
                   return res.json({
                       status	: 	true,
                       message	: 	'Login Successfull!',
                       token	: token,
                       name:doc.name,
                       email:doc.email
                   }); 
    
       //    res.send({status:true,message:'login successful',name:doc.name,email:doc.email});
       }else{
           res.send({status:false,message:'incorrect password'});
       }
       
   }else{
   res.send({status:false,message:'please signup'});
   }
   },(e)=>{
       console.log('err',e);
        //res.send({status:false,message:'error in loging in'});
   }); 
});





var signout=((req,res,next)=>{
var token = jwt.sign({ id:'' }, JWTSECRET);
    //console.log('signoutMethod',token);
    res.cookie('jwtToken',['',false]);
    return res.json({
        status	:	true,
        message	:	'logout successfull!',
        token	:	token,
    });
});




var profile = ((req,res,next)=>{
    res.send({username:req.currentUser.name,useremail:req.currentUser.email});
});

module.exports = {signin,signout,signup,profile};