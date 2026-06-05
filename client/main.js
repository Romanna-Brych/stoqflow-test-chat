import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { MessagesCollection } from "../imports/MessagesCollection";

import "./main.html";
import "./main.css";

Template.chat.onCreated(function () {
  this.subscribe("messages");

  //instance
  // (useState)
  this.sender = new ReactiveVar("receiver");
  this.recipient = new ReactiveVar("userone");
});

Template.chat.helpers({
  messages() {
    return MessagesCollection.find();
  },

  isSender(user) {
    return Template.instance().sender.get() === user;
  },

  isRecipient(user) {
    return Template.instance().recipient.get() === user;
  },
});

Template.chat.events({
  "change [name='sender']"(event, instance) {
    instance.sender.set(event.target.value);
  },

  "change [name='recipient']"(event, instance) {
    instance.recipient.set(event.target.value);
  },

  "submit .message-form"(event, instance) {
    event.preventDefault();

    const text = event.target.message.value;
    const from = instance.sender.get();
    const to = instance.recipient.get();

    Meteor.call("messages.send", { from, to, text });

    event.target.reset();
  },
});
