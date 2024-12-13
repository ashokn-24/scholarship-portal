const path = require("path");
const ejs = require("ejs");
const sendEmail = require("../../utils/sendEmail");
const { eventEmitter, events } = require("../emitter");

const { FORM_SUBMITTED } = events;

eventEmitter.on(FORM_SUBMITTED, async (data) => {
  const { name, email, referenceId } = data;

  sendEmail(email, {
    subject: `Scholarship form submitted successfully`,
    html: await ejs.renderFile(
      path.join(process.cwd(), "/templates", "/formSubmitted.ejs"),
      { name, referenceId }
    ),
  });
});
