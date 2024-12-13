const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

const events = {
  CONTACT_US: "CONTACT_US",
  FORM_SUBMITTED: "FORM_SUBMITTED",
};

module.exports = {
  eventEmitter,
  events,
};
