const Ticket = require ('../models/ticket');
const ticketCtrl = {};

ticketCtrl.getTickets = async (req, res, next ) => {
    const tickets = await Ticket.find();
    res.json (tickets);

};

ticketCtrl.createTicket = async (req, res, next) => {
  
  //  process.env.TZ = 'Europe/Madrid';
   // var a = new Date();
  //  var d = a - '1000';
    const ticket = new Ticket ({
        title: req.body.title, 
        description: req.body.description,
        applicant: req.body.applicant,
        applicantId: req.body.applicantId,
        responsable: req.body.responsable,
       status: req.body.status,
        created:  new Date()
        // created: d 
    });
    await ticket.save();
    res.json( ticket );
    res.json ({
        status: 'Ticket Created'
    });


};

ticketCtrl.getTicket  = async (req,res,next)=> {
    const { id } = req.params; 
    const ticket = await Ticket.findById(id);
    res.json(ticket); 
};


ticketCtrl.editTicket = async (req, res, next) => {
    const  {id}  = req.params;
    const ticket = {
        //title: req.body.title, 
       // description: req.body.description,
        //applicant: req.body.applicant,
       responsable: req.body.responsable,
        status: req.body.status,
      // modified:  new Date(),
      response: req.body.response,
    };
   await Ticket.findByIdAndUpdate(id, {$set: ticket}, {new: true});
    res.json({status: 'Ticket Updated'});
};

ticketCtrl.deleteTicket = async (req, res, next) => {
    await Ticket.findByIdAndRemove(req.params.id);
    res.json({status: 'Ticket Deleted'});
};



module.exports = ticketCtrl;