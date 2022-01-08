self.addEventListener('push', event => {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Test Webpush';
    const options = {
        body: event.data.text(),
    };
    event.waitUntil(self.registration.showNotification(title, options));
    self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window',
      }).then((clients) => {
        if (clients && clients.length) {
          // Send a response - the clients
          // array is ordered by last focused
          clients[0].postMessage(event.data.text());
        }
      });
});