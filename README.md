# logger
const sendEmail = async function() {
    const eData = [{
        to: "ranjeetcdas@gmail.com",
        from: "hr@letsweds.com",
        subject: `attachment testing`,
        // attachments: [{
        //     filename: 'letter_of_intent.pdf',
        //     content: base64File,
        //     type: 'application/pdf',
        //     disposition: 'attachment',
        //     contentId: 'offer_letter'
        // }],
        html: htTemp
    }];
    await sendGridMail(eData);
}

const sgMail = require("@sendgrid/mail");
const sendgridApiKey = "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";
sgMail.setApiKey(sendgridApiKey);

exports.sendGridMail = async function(emailArr) {
    try {
        const res = await sgMail.send(emailArr);
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
