

// const firebaseConfig = {
//   apiKey: "AIzaSyCidYNtJ_MHV5WMVovV2ose93zRBRHa7g4",
//   authDomain: "mercurial-ai-next.firebaseapp.com",
//   projectId: "mercurial-ai-next",
//   storageBucket: "mercurial-ai-next.appspot.com",
//   messagingSenderId: "316786392930",
//   appId: "1:316786392930:web:1f105f42bf39273298763b",
//   measurementId: "G-7XQJP340GG"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAX8FQ6viaqvfqJtZhnKo1g_N02BtL3PNE",
  authDomain: "mercurialai.firebaseapp.com",
  projectId: "mercurialai",
  storageBucket: "mercurialai.appspot.com",
  messagingSenderId: "150166491010",
  appId: "1:150166491010:web:6faa919c0bf0b9d1f9099b",
  measurementId: "G-MTNBP0VPMP"
};

const CACHE_NAME = "my-site-cache";
const OFFLINE_URL = "offline.html";

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
//   const data = event.data.json();
//   console.log("Push event received:", data);
// });

// self.addEventListener("notificationclick", (event) => {
//   console.log('notificationclick-sw',event.notification)

//   event.notification.close();
//   event.waitUntil(clients.openWindow("/"));
// });
