const notificationCtrl = {}; 
var nodeMailgun = require('nodemailer-mailgun-transport');
const nodemailer = require('nodemailer');
// const notification = require('')
const Notification = require ('../models/notification');


notificationCtrl.createNotification = async (req, res, next) => {
     
console.log('body de notificaciones:::',req.body);


const notification = new Notification ({
    creator:req.body.creator,
    creatorId:req.body.creatorId,
    responsable:req.body.responsable,
    responsableId:req.body.responsableId,
    title:req.body.title,
    longTitle:req.body.longTitle,
    form: req.body.form,
    description:req.body.description,
    read:req.body.read,
    action:req.body.action,
    created: new Date(),
    managementId:req.body.managementId,  
    color: req.body.color,
})




const notificationExist = await Notification.find({
      responsableId:req.body.responsableId,
      managementId: req.body.managementId,
      action: req.body.action,
      read:req.body.read,
      longTitle:req.body.longTitle,
    });

const [notificationExist2] = notificationExist
//console.log(notificationExist2)

if (notificationExist2 === undefined){
   // console.log('no existe una notificacion previa', notificationExist);
    await notification.save();
   // console.log('notification created')
    res.json({
        status:'Notification Created',
    })



} else{
     
  //  console.log('si existe una notificacion previa', notificationExist)
    console.log('error 202')
    res.json(202);
}


// 


}

notificationCtrl.findActionsNot = async (req, res, next) =>{

console.log(req.body, ' 1111') 
const tNotification = await Notification.find
({  
    form:req.body.form, 
    managementId:req.body.managementId
});


    console.log(tNotification, '22222')
    res.json(tNotification);
}

notificationCtrl.countNotifications = async (req, res, next) => {
  
    const count  = await Notification.find(
        // {responsableId:req.params.id, read:0}).count();
        {responsableId:req.params.id}).count();
        // console.log('cantidad', count);
        res.json(count);

}



notificationCtrl.getNotificationById = async (req, res, next) => {
      

 //   console.log( 'getNotificationById' , req.params.id )
    const tNotification = await Notification.find({_id:req.params.id});
        // {_id:req.params.id, read: 0});
   

    res.json(tNotification);
}

//notificaciones creadas por mi usuario 
notificationCtrl.getNotificationsByCreatorId = async (req, res, next) => {

const  creatorId = req.params.id; 
const managementId = req.body; 

//console.log('body',managementId)

 const MyNotifications = await Notification.find
 ({
   creatorId:req.body.idAutor, managementId:req.body.managementId
    });


 res.json(MyNotifications);   

}
//notificaciones asignadas a mi usuario
notificationCtrl.getNotifications= async (req, res, next) => {


    const tNotification = await Notification.find(
        {responsableId:req.params.id})


    res.json(tNotification);
}

notificationCtrl.editNotification = async (req,res, next) => {
    
    const id = req.params.id; 
    const notification = req.body; 
    // console.log('recibimos',notification)
    const NotificationEdited = await Notification.findByIdAndUpdate(id, {$set: notification}, {new:true});
    // console.log('editamos',NotificationEdited);
    res.json({status: 'Notification Updated'});
}

notificationCtrl.deleteNotification = async (req,res, next) => {
    await Notification.findByIdAndRemove(req.params.id);
//    console.log('notification deleted')
	res.json({status: 'Notification Removed'});
}

module.exports = notificationCtrl;