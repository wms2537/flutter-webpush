function init() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js');
        navigator.serviceWorker.ready
            .then(function (registration) {
                return registration.pushManager.getSubscription();
            })
            .then(function (subscription) {
                if (!subscription) {
                    subscribe();
                } else {
                    window.parent.postMessage(JSON.stringify(subscription), "*");
                }
            });
        navigator.serviceWorker.onmessage = (event) => {
            window.parent.postMessage(event.data, "*");
        };
    }
}

window.logger = (flutter_value) => {
    console.log({ js_context: this, flutter_value });
}

function subscribe() {
    navigator.serviceWorker.ready
        .then(function (registration) {
            const vapidPublicKey = 'BJtmg83UEOHfTLX7tr-XKf1MzUBZ0VjT9n3aA4W9rXsHi3ASW1b7Wqx3gKZ0dus8Ye3uYwklcpDqo4mdX-0MMxA';

            return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
            });
        })
        .then(function (subscription) {
            window.parent.postMessage(JSON.stringify(subscription), "*");
        })
        .catch(err => console.error(err));
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}