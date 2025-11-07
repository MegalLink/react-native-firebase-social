import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Validar que las variables de entorno estén configuradas
const validateConfig = () => {
  const requiredKeys = [
    'EXPO_PUBLIC_FIREBASE_API_KEY',
    'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
    'EXPO_PUBLIC_FIREBASE_APP_ID',
  ];

  const missingKeys = requiredKeys.filter(
    (key) => !process.env[key] || process.env[key] === 'your_api_key_here'
  );

  if (missingKeys.length > 0) {
    console.warn(
      '⚠️  Firebase credentials missing. Please copy .env.example to .env and add your credentials.'
    );
    return false;
  }

  return true;
};

// Inicializar Firebase solo si hay credenciales válidas
let app;
let auth: ReturnType<typeof getAuth> | undefined;

if (validateConfig()) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    app = getApp();
    auth = getAuth(app);
  }
} else {
  console.warn('🔥 Firebase not initialized - missing configuration');
}

export { app, auth };
