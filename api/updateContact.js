const mongodb = require('mongodb');
var contact = require('../model/contact');

var updateContactMethod = ((req,res,next)=>{
    var detail = {
        email: req.body.email,
        name: req.body.name,
        number: req.body.num
    };
    
    var oldemail = req.body.oldemail;
    contact.findOneAndUpdate({email:oldemail,admin:req.currentUser.email},detail)
    .then((doc)=>{
        if(doc)
        {
        
        res.send({status:true,message:'contact updated'});
        
      }
      else{
        res.send({status:false,message:'contact not found'});
      }  
    },(e)=>{
        res.send({status:false,message:'contact not updated'});
    });
});

module.exports={updateContactMethod};