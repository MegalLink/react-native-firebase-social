# Configuración de Firebase

## Pasos para configurar Firebase en el proyecto

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Sigue los pasos para crear tu proyecto

### 2. Habilitar Authentication

1. En tu proyecto de Firebase, ve a "Authentication"
2. Haz clic en "Comenzar"
3. En la pestaña "Sign-in method", habilita "Email/Password"

### 3. Obtener las credenciales de configuración

1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. En la sección "Tus apps", selecciona "Web" (</>) 
3. Registra tu app
4. Copia las credenciales de configuración

### 4. Configurar variables de entorno

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y reemplaza los valores con tus credenciales de Firebase:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=tu_app_id
   ```

3. **IMPORTANTE**: El archivo `.env` ya está en `.gitignore` y no se subirá a Git

### 5. Reiniciar el servidor de desarrollo

Después de configurar las variables de entorno, reinicia el servidor:

```bash
npm start
```

## Arquitectura de Autenticación

### Estado Global - Zustand
- `store/auth-store.ts`: Maneja el estado global del usuario autenticado
- Estado persistente y reactivo
- Simple y sin boilerplate

### Queries y Mutations - React Query (TanStack Query)
- `hooks/use-auth.ts`: Hooks personalizados para autenticación
  - `useSignIn()`: Hook para iniciar sesión
  - `useSignUp()`: Hook para registro
  - `useSignOut()`: Hook para cerrar sesión
- Manejo automático de estados de carga y error
- Caché inteligente
- Retry automático en caso de fallos

### Servicios
- `services/auth-service.ts`: Lógica de negocio de autenticación
  - Métodos para registro, login y logout
  - Manejo centralizado de errores
  - Mensajes de error en español

### Configuración
- `config/firebase.ts`: Inicialización de Firebase
  - Validación de credenciales
  - Configuración segura
  - Logs informativos

## Seguridad

✅ Las credenciales de Firebase están en variables de entorno
✅ El archivo `.env` está en `.gitignore`
✅ Las credenciales nunca se suben a Git
✅ Usa `.env.example` como plantilla sin datos sensibles

## Flujo de Autenticación

1. Usuario ingresa credenciales
2. Hook `useSignIn` o `useSignUp` maneja la mutación
3. `AuthService` realiza la llamada a Firebase
4. Zustand actualiza el estado global
5. React Query invalida cache si es necesario
6. `AuthStateListener` escucha cambios en el estado de autenticación
7. La UI se actualiza automáticamente

## Testing

Para probar sin configurar Firebase:
- La app mostrará advertencias en consola pero no crasheará
- Las pantallas de login/registro seguirán funcionando visualmente
- Configura Firebase para probar la funcionalidad completa
