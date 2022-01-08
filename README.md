# flutter_webpush

A Flutter VAPID Web Push example project. This implementation uses [webpush-go](https://github.com/SherClockHolmes/webpush-go) as backend server.

## Getting Started
Replace the VAPID public key in `web/app.js` with your public key.

The subscription will be printed out in your console. Use it in your backend to send notifications to this client.

Subsequent messages will be printed out to console. An event listener is used to listen for push messages from the service worker.


