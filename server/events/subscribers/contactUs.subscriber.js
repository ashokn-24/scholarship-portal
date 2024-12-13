const path = require("path");
const ejs = require("ejs");
const sendEmail = require("../../utils/sendEmail");
const { eventEmitter, events } = require("../emitter");

const { CONTACT_US } = events;

eventEmitter.on(CONTACT_US, async (data) => {
  const { name, email, questions } = data;
  const adminEmail = process.env.SMTP_USERNAME;

  sendEmail(email, {
    subject: `${name} has submitted a query through contact us form`,
    html: await ejs.renderFile(
      path.join(process.cwd(), "/templates", "/contactUs.ejs"),
      { name, email, questions }
    ),
  });
});
