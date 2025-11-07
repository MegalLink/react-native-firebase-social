import { auth } from '@/config/firebase';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
} from 'firebase/auth';

export interface SignUpData {
  email: string;
  password: string;
  displayName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export class AuthService {
  /**
   * Registrar nuevo usuario
   */
  static async signUp({ email, password, displayName }: SignUpData): Promise<User> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar el perfil con el nombre
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName,
        });
      }

      return userCredential.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Iniciar sesión
   */
  static async signIn({ email, password }: SignInData): Promise<User> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Cerrar sesión
   */
  static async signOut(): Promise<void> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized');
    }

    try {
      await signOut(auth);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Observador del estado de autenticación
   */
  static onAuthStateChanged(callback: (user: User | null) => void) {
    if (!auth) {
      console.warn('Firebase Auth is not initialized');
      callback(null);
      return () => {};
    }

    return onAuthStateChanged(auth, callback);
  }

  /**
   * Manejo de errores de Firebase Auth
   */
  private static handleAuthError(error: any): Error {
    const errorCode = error.code;
    let message = 'Ha ocurrido un error. Por favor, intenta de nuevo.';

    switch (errorCode) {
      case 'auth/email-already-in-use':
        message = 'Este correo electrónico ya está en uso.';
        break;
      case 'auth/invalid-email':
        message = 'El correo electrónico no es válido.';
        break;
      case 'auth/operation-not-allowed':
        message = 'Operación no permitida.';
        break;
      case 'auth/weak-password':
        message = 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
        break;
      case 'auth/user-disabled':
        message = 'Esta cuenta ha sido deshabilitada.';
        break;
      case 'auth/user-not-found':
        message = 'No se encontró ninguna cuenta con este correo electrónico.';
        break;
      case 'auth/wrong-password':
        message = 'Contraseña incorrecta.';
        break;
      case 'auth/too-many-requests':
        message = 'Demasiados intentos fallidos. Por favor, intenta más tarde.';
        break;
      case 'auth/network-request-failed':
        message = 'Error de conexión. Verifica tu conexión a internet.';
        break;
      default:
        message = error.message || message;
    }

    return new Error(message);
  }
}
