import { getApps, initializeApp } from "firebase/app";
import { getToken, getMessaging } from "firebase/messaging";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import axios from 'axios';

const notificationApi = process.env.BACKEND_TOKEN_API;
export const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAX8FQ6viaqvfqJtZhnKo1g_N02BtL3PNE",
    authDomain: "mercurialai.firebaseapp.com",
    projectId: "mercurialai",
    storageBucket: "mercurialai.appspot.com",
    messagingSenderId: "150166491010",
    appId: "1:150166491010:web:6faa919c0bf0b9d1f9099b",
    measurementId: "G-MTNBP0VPMP"
  };

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
};

export const askForPermissionToReceiveNotifications = async (userId, storedToken) => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const messaging = getMessaging();
      const vapidKey = "BCXGG6TF5G6Cqa7oos5ZyUkcI_XRNKrLddQqjIrTsEDUbAmu5eN8d678ux1BGBfim2Dfa2J4lMytZi_BOqEOTXs";
      const token = await getToken(messaging, { vapidKey });
      console.log("Your token is:", token);
      // const userId = localStorage.getItem("userId");

      const url = `${notificationApi}/user/save-fcm-token`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedToken}`,
      };

      const data = {
        userId,
        fcmToken: token,
      };

      try {
        await axios.post(url, data, { headers });
        console.log('FCM token saved successfully');
      } catch (error) {
        console.error('Error saving FCM token:', error);
      }


    } else {
      console.error("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};



// export const askForPermissionToReceiveNotifications = async () => {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "granted") {
//       console.log("Notification permission granted");
//       initializeFirebase();
//       const messaging = getMessaging();
//       const vapidKey ="BCXGG6TF5G6Cqa7oos5ZyUkcI_XRNKrLddQqjIrTsEDUbAmu5eN8d678ux1BGBfim2Dfa2J4lMytZi_BOqEOTXs";
//       const token = await getToken(messaging, { vapidKey });
//       console.log("Your token is:", token);
//       if (token) {
//         const db = getFirestore();
//         const tokensCollection = collection(db, "ids");
//         await addDoc(tokensCollection, {
//           fcmToken: token,
//         });
//         console.log("Token saved to Firestore successfully");
//       } else {
//         console.error("Unable to retrieve FCM token");
//       }
//     } else {
//       console.log("Notification permission denied");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };