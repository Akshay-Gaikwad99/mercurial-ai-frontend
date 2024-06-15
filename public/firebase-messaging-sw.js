// // importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js");
// // importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js");

// // const CACHE_NAME = "my-site-cache";
// // const OFFLINE_URL = "offline.html";

// // firebase.initializeApp({
// //   // apiKey: "AIzaSyCidYNtJ_MHV5WMVovV2ose93zRBRHa7g4",
// //   // authDomain: "mercurial-ai-next.firebaseapp.com",
// //   // projectId: "mercurial-ai-next",
// //   // storageBucket: "mercurial-ai-next.appspot.com",
// //   // messagingSenderId: "316786392930",
// //   // appId: "1:316786392930:web:1f105f42bf39273298763b",
// //   // measurementId: "G-7XQJP340GG",

// //   apiKey: "AIzaSyAX8FQ6viaqvfqJtZhnKo1g_N02BtL3PNE",
// //   authDomain: "mercurialai.firebaseapp.com",
// //   projectId: "mercurialai",
// //   storageBucket: "mercurialai.appspot.com",
// //   messagingSenderId: "150166491010",
// //   appId: "1:150166491010:web:6faa919c0bf0b9d1f9099b",
// //   measurementId: "G-MTNBP0VPMP"
// // });

// // self.addEventListener("install", (event) => {
// //   event.waitUntil(
// //     (async () => {
// //       const cache = await caches.open(CACHE_NAME);
// //       await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
// //     })()
// //   );
// // });

// // self.addEventListener("fetch", (event) => {
// //   if (event.request.mode === "navigate") {
// //     event.respondWith(
// //       (async () => {
// //         try {
// //           const preloadResponse = await event.preloadResponse;
// //           if (preloadResponse) {
// //             return preloadResponse;
// //           }
// //           const networkResponse = await fetch(event.request);
// //           return networkResponse;
// //         } catch (error) {
// //           const cache = await caches.open(CACHE_NAME);
// //           const cachedResponse = await cache.match(OFFLINE_URL);
// //           return cachedResponse;
// //         }
// //       })()
// //     );
// //   }
// // });

// // self.addEventListener("push", (event) => {
// //   const payload = event.data.json();
// //   const notification = payload.notification;
// //   const title = notification.title;
// //   const body = notification.body;
// //   const icon = notification.icon;
// //   const url = payload.data.url;
// //   console.log("Notification payload:", payload);
// //   const options = {
// //     body: body,
// //     icon: icon,
// //     data: {
// //       url: url  
// //     }
// //   };
// //   event.waitUntil(self.registration.showNotification(title, options));
// // });

// // self.addEventListener("notificationclick", (event) => {
// //   event.notification.close();
// //   console.log('notificationclick', event.notification);

// //   // Retrieve the URL from the notification data
// //   const url = event.notification.data.url;

// //   // Ensure the URL is provided
// //   if (url) {
// //     event.waitUntil(clients.openWindow(url));
// //   } else {
// //     // Fallback to the homepage if no URL is provided
// //     event.waitUntil(clients.openWindow("/"));
// //   }
// // });

// // const messaging = firebase.messaging();


// importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js");

// const CACHE_NAME = "my-site-cache";
// const OFFLINE_URL = "offline.html";

// firebase.initializeApp({
//   apiKey: "AIzaSyAX8FQ6viaqvfqJtZhnKo1g_N02BtL3PNE",
//   authDomain: "mercurialai.firebaseapp.com",
//   projectId: "mercurialai",
//   storageBucket: "mercurialai.appspot.com",
//   messagingSenderId: "150166491010",
//   appId: "1:150166491010:web:6faa919c0bf0b9d1f9099b",
//   measurementId: "G-MTNBP0VPMP"
// });

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);
//       await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
//     })()
//   );
// });

// self.addEventListener("fetch", (event) => {
//   if (event.request.mode === "navigate") {
//     event.respondWith(
//       (async () => {
//         try {
//           const preloadResponse = await event.preloadResponse;
//           if (preloadResponse) {
//             return preloadResponse;
//           }
//           const networkResponse = await fetch(event.request);
//           return networkResponse;
//         } catch (error) {
//           const cache = await caches.open(CACHE_NAME);
//           const cachedResponse = await cache.match(OFFLINE_URL);
//           return cachedResponse;
//         }
//       })()
//     );
//   }
// });

// self.addEventListener("push", (event) => {
//   const payload = event.data.json();
//   const notification = payload.notification;
//   const title = notification.title;
//   const body = notification.body;
//   const icon = notification.icon;
//   const url = payload.data.url;
//   console.log("Notification payload:", payload.data);
//   const msgReceiveData = JSON.parse(localStorage.getItem(""));

//   if (msgReceiveData.receive === false && url.includes("oncoChat")) {
//     const options = {
//       body: body,
//       icon: icon,
//       data: {
//         url: url
//       }
//     };
//     event.waitUntil(self.registration.showNotification(title, options));
//   }

// });

// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();
//   console.log('notificationclick', event.notification);

//   // Retrieve the URL from the notification data
//   const url = event.notification.data.url;

//   // Ensure the URL is provided
//   if (url) {
//     event.waitUntil(clients.openWindow(url));
//   } else {
//     // Fallback to the homepage if no URL is provided
//     event.waitUntil(clients.openWindow("/"));
//   }
// });

// const messaging = firebase.messaging();



importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js");

const CACHE_NAME = "my-site-cache";
const OFFLINE_URL = "offline.html";

firebase.initializeApp({
  apiKey: "AIzaSyAX8FQ6viaqvfqJtZhnKo1g_N02BtL3PNE",
  authDomain: "mercurialai.firebaseapp.com",
  projectId: "mercurialai",
  storageBucket: "mercurialai.appspot.com",
  messagingSenderId: "150166491010",
  appId: "1:150166491010:web:6faa919c0bf0b9d1f9099b",
  measurementId: "G-MTNBP0VPMP"
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
});

self.addEventListener("push", (event) => {
  const payload = event.data.json();
  const notification = payload.notification;
  const title = notification.title;
  const body = notification.body;
  const icon = notification.icon;
  const url = payload.data.url;

  console.log("Notification payload:", payload.data);


  event.waitUntil(
    getFromIndexedDB('msgReceiveStore', 'msgReceive').then(msgReceiveData => {
      if (msgReceiveData && msgReceiveData.receive === false && url.includes("oncoChat")) {
        const options = {
          body: body,
          icon: icon,
          data: {
            url: url
          }
        };  
        self.registration.showNotification(title, options);
      }
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  console.log('notificationclick', event.notification);

  const url = event.notification.data.url;

  // Update the receive state to true
  const updateReceiveState = saveToIndexedDB('msgReceiveStore', 'msgReceive', { time: Date.now(), receive: true });

  if (url) {
    event.waitUntil(
      updateReceiveState.then(() => clients.openWindow(url))
    );
  } else {
    event.waitUntil(
      updateReceiveState.then(() => clients.openWindow("/"))
    );
  }
});

const messaging = firebase.messaging();

// IndexedDB utility functions
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('myDatabase', 1);
    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('msgReceiveStore')) {
        db.createObjectStore('msgReceiveStore');
      }
    };
    request.onsuccess = event => {
      resolve(event.target.result);
    };
    request.onerror = event => {
      reject(event.target.error);
    };
  });
}

function getFromIndexedDB(storeName, key) {
  return openIndexedDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}

function saveToIndexedDB(storeName, key, value) {
  return openIndexedDB().then(db => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(value, key);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  });
}
