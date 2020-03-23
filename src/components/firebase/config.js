const firebaseConfig = {
  apiKey: process.env.GATSBY_FB_CONFIG_API_KEY,
  authDomain: process.env.GATSBY_FB_CONFIG_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FB_CONFIG_DATABASE_URL,
  projectId:  process.env.GATSBY_FB_CONFIG_PROJECT_ID,
  storageBucket: process.env.GATSBY_FB_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FB_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FB_CONFIG_APP_ID,
  measurementId: process.env.GATSBY_FB_CONFIG_MEASUREMENT_ID,
};

export default firebaseConfig;
