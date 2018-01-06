const mongodb = require('mongodb');
var contact = require('../model/contact');

var addContactMethod = ((req,res,next)=>{
    var detail = new contact({
        email: req.body.email,
        name: req.body.name,
        number: req.body.num,
        admin: req.currentUser.email
    });
    contact.findOne({email:detail.email,admin:detail.admin}).then((doc)=>{
      if(!doc){
        detail.save().then((docu) =>{
    
            res.send({status:true,message:'data saved'});
        },(e)=>{
            res.send({status:false,message:'data not saved'});
        })
      }else{
          res.send({status:false,message:'data exists'});
      }  
    });
});

module.exports={
    addContactMethod
};