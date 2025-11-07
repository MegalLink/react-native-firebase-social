# React Native Firebase Social App

Aplicación de red social construida con React Native, Expo Router y React Native Paper.

## 🎨 Características

- ✅ Pantalla de Login con diseño gradiente
- ✅ Pantalla de Registro con validación
- ✅ Tema personalizado usando React Native Paper
- ✅ Navegación con Expo Router
- ✅ Soporte para modo claro/oscuro
- ✅ Diseño responsive y moderno

## 📱 Pantallas

### Login
- Email y contraseña
- Opción de mostrar/ocultar contraseña
- Enlace de recuperación de contraseña
- Navegación a registro

### Registro
- Nombre completo
- Email
- Contraseña
- Confirmación de contraseña
- Navegación a login

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar Firebase (IMPORTANTE)
# 1. Copia el archivo .env.example a .env
cp .env.example .env

# 2. Edita .env y agrega tus credenciales de Firebase
# Ver FIREBASE_SETUP.md para instrucciones detalladas

# Iniciar la aplicación
npm start
```

## 📦 Dependencias principales

- **expo**: Framework para React Native
- **expo-router**: Navegación basada en archivos
- **react-native-paper**: Librería de UI con Material Design
- **expo-linear-gradient**: Gradientes para fondos
- **firebase**: Autenticación y backend
- **zustand**: State management global
- **@tanstack/react-query**: Manejo de datos asíncronos y cache
- **react-native-reanimated**: Animaciones de alto rendimiento
- **react-native-vector-icons**: Iconos vectoriales

## 🎨 Tema

El tema está configurado en `/constants/theme.ts` con colores personalizados:

### Modo Claro
- Primary: #6366F1 (Índigo)
- Secondary: #EC4899 (Rosa)
- Tertiary: #8B5CF6 (Púrpura)

### Modo Oscuro
- Primary: #818CF8 (Índigo claro)
- Secondary: #F472B6 (Rosa claro)
- Tertiary: #A78BFA (Púrpura claro)

## 📁 Estructura del Proyecto

```
app/
  ├── (auth)/
  │   ├── _layout.tsx      # Layout de autenticación
  │   ├── login.tsx        # Pantalla de login
  │   └── register.tsx     # Pantalla de registro
  ├── _layout.tsx          # Layout principal con PaperProvider
  └── index.tsx            # Redirección a login
components/
  ├── auth-avatar.tsx      # Componente de avatar reutilizable
  ├── animated-screen.tsx  # Wrapper con animaciones
  └── providers.tsx        # React Query Provider + Auth Listener
config/
  └── firebase.ts          # Configuración de Firebase
constants/
  └── theme.ts             # Configuración del tema
hooks/
  ├── use-auth.ts          # Hooks de autenticación (React Query)
  └── use-color-scheme.ts  # Hook para tema claro/oscuro
services/
  └── auth-service.ts      # Lógica de negocio de autenticación
store/
  └── auth-store.ts        # Estado global (Zustand)
```

## 🔜 Próximos pasos

- [x] Integrar Firebase Authentication
- [x] Implementar state management con Zustand
- [x] Implementar React Query para manejo de datos
- [x] Implementar validación de formularios
- [ ] Agregar pantalla de recuperación de contraseña
- [ ] Implementar persistencia de sesión
- [ ] Agregar pantallas de la red social (feed, perfil, etc.)

## 🔐 Autenticación

El proyecto usa:
- **Firebase Authentication**: Para manejo seguro de usuarios
- **Zustand**: State management simple y reactivo
- **React Query**: Cache inteligente y manejo de estados async
- **Variables de entorno**: Credenciales seguras (no se suben a Git)

Ver [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) para instrucciones detalladas.

## 👨‍💻 Desarrollo

Para ejecutar en diferentes plataformas:

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```