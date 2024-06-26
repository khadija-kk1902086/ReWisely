import nodemailer from "nodemailer"
import Handlebars from "handlebars";
import { activationTemplate } from "./emailTemplates/activation";
import { resetPasswordTemplate } from "./emailTemplates/resetPass";

/*export async function sendMail({to,subject,body}: {to:string,subject:string,body:string}){
    const {SMTP_EMAIL,SMTP_GMAIL_PASS, SMTP_USER, SMTP_PASS } = process.env;
     const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:SMTP_EMAIL,
            pass: SMTP_GMAIL_PASS,
        }
    }); 

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS
        }
      });

    try {
        const testResult = await transport.verify();
        console.log("Test Result of transport", testResult);
        
    } catch (error) {
        console.log(error);
        
    }

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body,


        });
        console.log(sendResult);
        
    } catch (error) {
        console.log(error);
        
    }
}*/

export async function sendMail({
    to,
    subject,
    body,
  }: {
    to: string;
    subject: string;
    body: string;
  }) {
    const { SMPT_EMAIL, SMTP_GMAIL_PASS, SMTP_USER, SMTP_PASS } = process.env;
    //
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  
    try {
      const testResult = await transport.verify();
      console.log("Test Result Of Transport", testResult);
    } catch (e) {
      console.log(e);
    }
    try {
      const sendResult = await transport.sendMail({
        from: SMPT_EMAIL,
        to,
        subject,
        html: body,
      });
      console.log({ sendResult });
      return sendResult;
    } catch (e) {
      console.log(e);
    }
  }
  
export function compileActivationTemplate(name:string|null, url:string){
    const template = Handlebars.compile(activationTemplate);
    const htmlBody = template({
        name,
        url,
    })
    return htmlBody;
}


export function compileResetPassTemplate(name:string|null, url:string){
    const template = Handlebars.compile(resetPasswordTemplate);
    const htmlBody = template({
        name,
        url,
    })
    return htmlBody;
}

