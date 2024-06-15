import Head from "next/head";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import {
  initializeFirebase,
  askForPermissionToReceiveNotifications,
} from "../push-notification";
import "../styles/global.css";
import "../styles/login.css";
import "../styles/homepage.css";
import "../styles/bottomBar.css";
import "../styles/profile.css";
import "../styles/tutorial.css";
import "../styles/oncoChat.css";
import "../styles/treatmentRecom.css";
import "../styles/treatmentDiary.css";
import "../styles/news.css";
import "../styles/symptoms.css";
import "../styles/labs.css";
import "../styles/popUp.css";
import "../styles/medication.css"
import "../styles/disclamirPopup.css";
import mixpanel from 'mixpanel-browser';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    initializeFirebase();
    // askForPermissionToReceiveNotifications();
    mixpanel.init('480a77dee0b4b2f3962c29805045dddc');
    // mixpanel.init('c416d96fc0f427c96575a269aed9f698');
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
