const result = require('../../models/eLearning/testing');
const resultsCtrl = {};

resultsCtrl.getResult = async (req, res) => {
    const results = await result.find();
    res.json(results);
}

resultsCtrl.getResultByCourseId = async (req, res) => {
    const id = req.params.id;
    results = await result.find({ course_id: id });
    res.json(results);
}

//Modulo Calificaciones
//Desarrolloado por: Mosiah Azuaje
//Query especial con agrupamientos y contadores
resultsCtrl.getResultByUserId = async (req, res) => {
    const id = req.params.id;

    result.aggregate([
        {"$match": {"user_id_rel": id }},
        {"$group": {
                "_id": "$token_session",
                "acumulado": {$sum:1},
                'buenas' : { $sum : { $cond: [ {  $eq: [ '$answer_status' , 'true' ] }, 1, 0 ] } },
                'malas' : { $sum : { $cond: [ {  $ne: [ '$answer_status' , 'true' ] }, 1, 0 ] } },
                'course_id': {$first: "$course_id"},
                'intento': {$first: "$attempt"},
                'fecha': {$first: "$updated"}},
        },
        {"$lookup":{"from":"courses","localField":"course_id", "foreignField":"_id","as":"courses"}}
    ]).exec((err, result) => {
        if (err) throw err;
        //console.log(result);
        res.json(result);
    });
}

resultsCtrl.createResult = async (req, res) =>{
    //Se almacenan las respuestas asociadas a la pregunta
    const array = ({
        awsgood: req.body.awsgood,
        awsbad: req.body.awsbad,
        course_id: req.body.course_id,
        user_id: req.body.user_id,
    });
    const testings = new testing(array)
    await testings.save();
    res.json("testing created");
}

resultsCtrl .getViewPPT = async(req, res) =>{ 
    const id = req.params.id;
    var fullName;

    result.aggregate([
        {"$match": {"user_id_rel": id }},
        {"$group": {
                "_id": "$token_session",
                "acumulado": {$sum:1},
                'buenas' : { $sum : { $cond: [ {  $eq: [ '$answer_status' , 'true' ] }, 1, 0 ] } },
                'malas' : { $sum : { $cond: [ {  $ne: [ '$answer_status' , 'true' ] }, 1, 0 ] } },
                'course_id': {$first: "$course_id"},
                'intento': {$first: "$attempt"},
                'fecha': {$first: "$updated"},
                'user_id': {$first: "$user_id"}}
        },
        {"$lookup":{"from":"courses","localField":"course_id", "foreignField":"_id","as":"courses"}},
        {"$lookup":{"from":"users","localField":"user_id", "foreignField":"_id","as":"users"}}

    ]).exec((err, result) => {
        if (err) throw err;

        fullName =result[0].users[0].firstName+ ' '+result[0].users[0].lastName;
        console.log(result);
        res.json(result);

        const officegen = require('officegen');
        const fs = require('fs');
        // Create an empty PPTX file
        let pptx = officegen('pptx');
        // Create a new slide
        let slide = pptx.makeNewSlide();
        // Add Image 
        slide.addImage('uploads/img/templateCertify.png', {  cx: 960, cy: 745, y:-28, x:-24 });
        // Add Text
        slide.addText('OTORGA EL', 0, 220, '97%', 20, { align: 'center', font_size:12, font_face:'Arial', color:'ffffff', bold:true });
        slide.addText('PRESENTE', 0, 240, '97%', 20, { align: 'center', font_size:12, font_face:'Arial', color:'ffffff', bold:true });
        slide.addText('CERTIFICADO DE ASISTENCIA', 0, 335, '100%', 200, { align: 'center', font_size:32, font_face:'Arial', color:'1F4E79', bold:true });
        slide.addText('a', 0, 375, '100%', 200, { align: 'center', font_size:20, font_face:'Arial', color:'1F4E79', bold:true });
        slide.addText(fullName, 0, 420, '100%', 20, { align: 'center', italic:true, font_size:22, font_face:'Arial' });
        slide.addText('La cual participo y aprobó la capacitación', 0, 470, '100%', 20, { align: 'center', italic:true, font_size:12, font_face:'Arial' });
        slide.addText(result[0].courses[0].title+' de '+NumeroALetras(result[0].courses[0].course_time)+'('+result[0].courses[0].course_time+') horas de duracion', 0, 490, '100%', 20, { align: 'center', italic:true, font_size:12, font_face:'Arial', color:'FF0000' });
        
        //Firmas ixquierda
        slide.addText('Nombre y Apellido', 0, 600, '37%', 20, { align: 'center', color:'1F4E79', font_size:9, font_face:'Arial' });
        slide.addText('Cargo', 0, 615, '36%', 20, { align: 'center', color:'1F4E79', font_size:9, font_face:'Arial' });
        //Firmas derecha
        slide.addText('Nombre y Apellido', 318, 598, '95%', 20, { align: 'center', color:'1F4E79', font_size:9, font_face:'Arial' });
        slide.addText('Cargo', 318, 613, '95%', 20, { align: 'center', color:'1F4E79', font_size:9, font_face:'Arial' });
    
        // Set save path
        let out = fs.createWriteStream('uploads/certificates/Template Certificados.pptx');
        // Save
        pptx.generate(out);        
    });
}

//Revisar
resultsCtrl .getViewPdf = async(req, res) =>{ 
    var fonts = {
        Roboto: {
            normal: 'fonts/Roboto-Regular.ttf',
            bold: 'fonts/Roboto-Medium.ttf',
            italics: 'fonts/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
    };
    
    var PdfPrinter = require('../src/printer');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');
    
    var docDefinition = {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
    };
    
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
    pdfDoc.end();
}

function Unidades(num){
 
    switch(num)
    {
      case 1: return "UN";
      case 2: return "DOS";
      case 3: return "TRES";
      case 4: return "CUATRO";
      case 5: return "CINCO";
      case 6: return "SEIS";
      case 7: return "SIETE";
      case 8: return "OCHO";
      case 9: return "NUEVE";
    }
   
    return "";
  }
   
  function Decenas(num){
   
    decena = Math.floor(num/10);
    unidad = num - (decena * 10);
   
    switch(decena)
    {
      case 1:
        switch(unidad)
        {
          case 0: return "DIEZ";
          case 1: return "ONCE";
          case 2: return "DOCE";
          case 3: return "TRECE";
          case 4: return "CATORCE";
          case 5: return "QUINCE";
          default: return "DIECI" + Unidades(unidad);
        }
      case 2:
        switch(unidad)
        {
          case 0: return "VEINTE";
          default: return "VEINTI" + Unidades(unidad);
        }
      case 3: return DecenasY("TREINTA", unidad);
      case 4: return DecenasY("CUARENTA", unidad);
      case 5: return DecenasY("CINCUENTA", unidad);
      case 6: return DecenasY("SESENTA", unidad);
      case 7: return DecenasY("SETENTA", unidad);
      case 8: return DecenasY("OCHENTA", unidad);
      case 9: return DecenasY("NOVENTA", unidad);
      case 0: return Unidades(unidad);
    }
  }//Unidades()
   
  function DecenasY(strSin, numUnidades){
    if (numUnidades > 0)
      return strSin + " Y " + Unidades(numUnidades)
   
    return strSin;
  }//DecenasY()
   
  function Centenas(num){
   
    centenas = Math.floor(num / 100);
    decenas = num - (centenas * 100);
   
    switch(centenas)
    {
      case 1:
        if (decenas > 0)
          return "CIENTO " + Decenas(decenas);
        return "CIEN";
      case 2: return "DOSCIENTOS " + Decenas(decenas);
      case 3: return "TRESCIENTOS " + Decenas(decenas);
      case 4: return "CUATROCIENTOS " + Decenas(decenas);
      case 5: return "QUINIENTOS " + Decenas(decenas);
      case 6: return "SEISCIENTOS " + Decenas(decenas);
      case 7: return "SETECIENTOS " + Decenas(decenas);
      case 8: return "OCHOCIENTOS " + Decenas(decenas);
      case 9: return "NOVECIENTOS " + Decenas(decenas);
    }
   
    return Decenas(decenas);
  }//Centenas()
   
  function Seccion(num, divisor, strSingular, strPlural){
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)
   
    letras = "";
   
    if (cientos > 0)
      if (cientos > 1)
        letras = Centenas(cientos) + " " + strPlural;
      else
        letras = strSingular;
   
    if (resto > 0)
      letras += "";
   
    return letras;
  }//Seccion()
   
  function Miles(num){
    divisor = 1000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)
   
    strMiles = Seccion(num, divisor, "MIL", "MIL");
    strCentenas = Centenas(resto);
   
    if(strMiles == "")
      return strCentenas;
   
    return strMiles + " " + strCentenas;
   
    //return Seccion(num, divisor, "UN MIL", "MIL") + " " + Centenas(resto);
  }//Miles()
   
  function Millones(num){
    divisor = 1000000;
    cientos = Math.floor(num / divisor)
    resto = num - (cientos * divisor)
   
    strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
    strMiles = Miles(resto);
   
    if(strMillones == "")
      return strMiles;
   
    return strMillones + " " + strMiles;
   
    //return Seccion(num, divisor, "UN MILLON", "MILLONES") + " " + Miles(resto);
  }//Millones()
   
  function NumeroALetras(num,centavos){
    var data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
      letrasCentavos: "",
    };
    if(centavos == undefined || centavos==false) {
      data.letrasMonedaPlural="";
      data.letrasMonedaSingular="";
    }else{
      data.letrasMonedaPlural="";
      data.letrasMonedaSingular="";
    }
   
    if (data.centavos > 0)
      data.letrasCentavos = "CON " + NumeroALetras(data.centavos,true);
   
    if(data.enteros == 0)
      return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
    if (data.enteros == 1)
      return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
    else
      return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  }//NumeroALetras()
module.exports = resultsCtrl;