const emailCtrl = {}; 
var nodeMailgun = require('nodemailer-mailgun-transport');
const nodemailer = require('nodemailer');
// const emailShema = require('../assets/emailSchema.html');



emailCtrl.postNotifications = function (req, res, next ) 
{     
  //  console.log(req.body);
        //step 1 
        const auth = { 
            auth: {
                api_key: '62c0113fe1b8f9537e3403a0f9994a5e-c27bf672-3fd8ccc6',
                domain: 'sandbox5753d6890e6b454f93030717e58f4e12.mailgun.org'
            }
        };
   
        //step 2 
        let transporter = nodemailer.createTransport(nodeMailgun(auth)); 
   
        //step 3 
        const texto = (`<!DOCTYPE html>
        <html>
        <head>
        <meta name='viewport' content='width=device-width' />
        <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
        <title>
        LupaWeb v2.0 Notification
        </title>
        <style type='text/css'>
        
        img {
        max-width: 100%;
        }
        body {
        -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
        }
        body {
        background-color: #f6f6f6;
        }
        .footer{
        
        font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
        box-sizing: border-box;
        font-size: 20px;
        margin: 0;
        text-align:center;
        color: #2a10ac;
        }
        
        .alert {  
        font-family: 'arial';
        font-size: 18px;
        box-sizing: border-box;
        vertical-align: top;
        color: #fff; 
        font-weight: 500; 
        text-align: center;
        border-radius: 3px 3px 0 0; 
        background: #5C258D;  
        background: -webkit-linear-gradient(to right, #2a60ac, rgb(000,060,077)); 
        background: linear-gradient(to right, #2a60ac, rgb(000,060,077)); 
        padding: 20px;
        margin: 0;
        }

        @media only screen and (max-width: 640px) {
          body {padding: 0 !important;}
          h1 {font-weight: 800 !important; margin: 20px 0 5px !important;}
          h2 {font-weight: 800 !important; margin: 20px 0 5px !important;}
          h3 {font-weight: 800 !important; margin: 20px 0 5px !important;}
          h4 {font-weight: 800 !important; margin: 20px 0 5px !important;}
          h1 {font-size: 22px !important;}
          h2 {font-size: 18px !important;}
          h3 {font-size: 16px !important;}
          .container {padding: 0 !important; width: 100% !important;}
          .content {padding: 0 !important;}
          .content-wrap {padding: 10px !important;}
          .invoice {width: 100% !important;}
          }
        </style>
        </head>
        
        <body  style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: ; margin: 0;" bgcolor="">
        <table class="body-wrap" >
        <tr>
            <td>
            </td>
            <td>
              <div>  
                <table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #F2F2F2; margin: 0; border: 1px solid darkgray;" >     
                <tr>    
                <td class="alert"  align="center" bgcolor="#FF9F00" valign="top">
                  `+ req.body.subject  +`
                    </td>
                  </tr>
                  <tr >
                  <td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                      <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                      <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                         Estimado(a) ` + req.body.toName + req.body.subject + `.
                          </td>
                        </tr>
                        <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                        <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                            Puede conocer los detalles ingresando a la seccion de <b> Notificaciones </b> de LupaWeb, o a través del siguiente enlace: 
                          </td>
                        </tr>
                        <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">          
                        <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align:center; padding: 0 0 20px;" valign="top">               
                            <a href="http://www.mailgun.com" class="btn-primary" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Ver Notificacion</a>
                          </td>    
                        </tr>
                        <tr class="footer">
                        <td class="content-block">
                         <b> Lupatech OFS</b>
                          </td>
                        </tr>
                        </table>
                        </td>
                  </tr>
                  </table>
                  <div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                  <table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                  <td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">
                    </tr>
                </table>
            </div>
        </div>
            </td>
            <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
          </tr>
        </table>
        </body>
        </html>`);
        
        const mailOptions = { 
           from: 'Lupatech Bot <lupatech@sample.mailgun.org>',
           to:  'req.body.to',
           subject: req.body.subject,
           html:  texto
        }
   
        //step 4 
        transporter.sendMail(mailOptions, function(err, data){
          if(err){
           //   console.log('Error', err);
              res.json({
                status: 'error',
                err:  err
            }) 
          }else{
              res.json({
                  status: 'email send',
                  data: data
              })
          //    console.log('mensaje enviado correctamente');
          }
        })
}

module.exports = emailCtrl;