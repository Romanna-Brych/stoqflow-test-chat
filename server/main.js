import { Meteor } from "meteor/meteor";
import { MessagesCollection } from "../imports/MessagesCollection";
import { check } from "meteor/check";

const ALLOWED_USERS = ["userone", "usertwo", "receiver"];

function isAllowedConversation(from, to) {
  return (
    (from === "userone" && to === "receiver") ||
    (from === "usertwo" && to === "receiver") ||
    (from === "receiver" && to === "userone") ||
    (from === "receiver" && to === "usertwo")
  );
}

Meteor.startup(async () => {
  if ((await MessagesCollection.find().countAsync()) === 0) {
    await MessagesCollection.insertAsync({
      from: "userone",
      to: "receiver",
      text: "lalala",
      createdAt: new Date(),
    });
    await MessagesCollection.insertAsync({
      from: "usertwo",
      to: "receiver",
      text: "tututtu",
      createdAt: new Date(),
    });
  }
});

// Meteor.publish("massage", function (user) {
//   if (!user) {
//     throw new Meteor.Error("user-error", "user-error");
//   }
//   if (!ALLOWED_USERS.includes(user)) {
//     throw new Meteor.Error("user-error", "user not found");
//   }
// });

Meteor.publish("messages", function () {
  return MessagesCollection.find();
});

Meteor.methods({
  async "messages.send"({ from, to, text }) {
    check(from, String);
    check(to, String);
    check(text, String);

    const trimmedText = text.trim();

    if (!ALLOWED_USERS.includes(from) || !ALLOWED_USERS.includes(to)) {
      throw new Meteor.Error("invalid-user", "Invalid sender or receiver");
    }

    if (!trimmedText) {
      throw new Meteor.Error("empty-message", "Message cannot be empty");
    }

    if (!isAllowedConversation(from, to)) {
      throw new Meteor.Error("not-allowed", "This conversation is not allowed");
    }

    return MessagesCollection.insertAsync({
      from,
      to,
      text: trimmedText,
      createdAt: new Date(),
    });
  },
});
