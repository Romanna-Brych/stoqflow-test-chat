# Simple Meteor Chat

## Overview

This project is a simple chat application built with Meteor, Blaze, and MongoDB.

The application contains three predefined users:

- receiver
- userone
- usertwo

The allowed conversations are:

- userone ↔ receiver
- usertwo ↔ receiver

Direct communication between userone and usertwo is not allowed.

---

## Implemented Features

### Backend

- Messages Mongo collection
- Initial seed data
- Meteor publication for messages
- Meteor method for sending messages
- Server-side validation:
  - sender validation
  - recipient validation
  - empty message validation
  - conversation rules validation
- Only receiver can communicate with userone and usertwo.Direct communication between userone and usertwo is blocked by server validation.

### Frontend

- Blaze templates
- Messages list
- Sender selection using radio buttons
- Recipient selection using radio buttons
- Message form
- Message submission through Meteor methods
- Reactive state using ReactiveVar
- Real-time updates through Meteor publish/subscribe

---

## Assumptions

The users are predefined and hardcoded.

No authentication system was implemented.

---

## Future Improvements

If more time was available, I would implement:

### Conversation Filtering

Currently all messages are displayed.

The next step would be displaying only messages that belong to the selected sender/recipient conversation.

Example:

If:

- sender = userone
- recipient = receiver

Only messages between these two users would be displayed.

### UI Improvements

- Better styling
- Active conversation highlighting
- Error message display in the UI instead of browser alerts
