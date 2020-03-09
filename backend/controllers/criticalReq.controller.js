const wellCondition = require ('../models/criticalsReq/wellCondition');
const operationCondition = require ('../models/criticalsReq/operationCondition');
const hseCondition  = require ('../models/criticalsReq/hseCondition');
const technologyCondition = require('../models/criticalsReq/technologyCondition');
const criticalsReqCtrl = {}; 



//condiciones de pozo
criticalsReqCtrl.getWellConditions = async (req, res ) => {
    const condition = await wellCondition.find()
    res.json(condition); 
}

criticalsReqCtrl.createWellCondition = async (req, res ) => {

    const condition = new wellCondition({
        title: req.body.title, 
        wt: req.body.wt,
        wl: req.body.wl,
        sl: req.body.sl,
        ct: req.body.ct,
        fi: req.body.fi,
        justification: req.body.justification
    })

    await condition.save()
    console.log('condicion de pozo creada ')
    res.json({
        status: 'condicion de pozo creada'
    })
}

criticalsReqCtrl.editWellCondition  = async (req, res ) => {
    const id = req.params.id;
    const condition = req.body; 
    await wellCondition.findByIdAndUpdate(id,{$set:condition},{new:true});
    res.json({
        status: 'condicion de pozo actualizada'
    })
}


//condiciones de operaciones
criticalsReqCtrl.getOperationConditions = async (req, res) =>{
    const condition = await operationCondition.find() 
    res.json(condition);    
}


criticalsReqCtrl.createOperationCondition= async (req, res ) => {

    const condition = new operationCondition({
        title: req.body.title, 
        wt: req.body.wt,
        wl: req.body.wl,
        sl: req.body.sl,
        ct: req.body.ct,
        fi: req.body.fi,
        justification: req.body.justification
    })
    
    await condition.save()
    
    console.log('condicion de operacion creada ')
    
    res.json({
        status: 'condicion de operacion creada'
    })
}


criticalsReqCtrl.editOperationCondition  = async (req, res ) => {
    const id = req.params.id;
    const condition = req.body; 
    await operationCondition.findByIdAndUpdate(id,{$set:condition},{new:true});
    res.json({
        status: 'condicion de operacion actualizada'
    })
}

//condiciones de hse 
criticalsReqCtrl.getHseConditions = async (req, res) => {
    const condition = await hseCondition.find()
    res.json(condition);    
}



criticalsReqCtrl.createHseCondition= async (req, res ) => {

    const condition = new hseCondition({
        title: req.body.title, 
        wt: req.body.wt,
        wl: req.body.wl,
        sl: req.body.sl,
        ct: req.body.ct,
        fi: req.body.fi,
        justification: req.body.justification
    })

    await condition.save()

    console.log('condicion de hse creada ')

    res.json({
        status: 'condicion de hse creada'
    })

}

criticalsReqCtrl.editHseCondition  = async (req, res ) => {
    const id = req.params.id;
    const condition = req.body; 
    await hseCondition.findByIdAndUpdate(id,{$set:condition},{new:true});
    res.json({
        status: 'condicion de hse actualizada'
    })
}


//condiciones tecnologicas 
criticalsReqCtrl.getTechnologyConditions = async (req, res) => {
    const condition = await technologyCondition.find()
    res.json(condition);    
}

criticalsReqCtrl.createTechnologyCondition= async (req, res ) => {

    const condition = new technologyCondition({
        title: req.body.title, 
        wt: req.body.wt,
        wl: req.body.wl,
        sl: req.body.sl,
        ct: req.body.ct,
        fi: req.body.fi,
        justification: req.body.justification
    })

    await condition.save()

    console.log('condicion tecnologica creada ')

    res.json({
        status: 'condicion tecnologica creada'
    })

}

criticalsReqCtrl.editTechnologyCondition  = async (req, res ) => {
    const id = req.params.id;
    const condition = req.body; 
    await technologyCondition.findByIdAndUpdate(id,{$set:condition},{new:true});
    res.json({
        status: 'condicion tecnologica actualizada'
    })
}

module.exports  = criticalsReqCtrl; 