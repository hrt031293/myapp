const mongodb = require('mongodb');
var contact = require('../model/contact');

var fetchContactMethod = ((req,res,next)=>{
    var admin = req.currentUser.email;

    //console.log(req.currentUser);
    contact.find({admin}).then((contact)=>{
    //console.log(contact);
    res.status(200).send({contact});
    },(e)=>{
    res.status(404).send(e);
    });
});

module.exports={fetchContactMethod};