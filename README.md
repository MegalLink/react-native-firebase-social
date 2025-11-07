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

# Iniciar la aplicación
npm start
```

## 📦 Dependencias principales

- **expo**: Framework para React Native
- **expo-router**: Navegación basada en archivos
- **react-native-paper**: Librería de UI con Material Design
- **expo-linear-gradient**: Gradientes para fondos

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
constants/
  └── theme.ts             # Configuración del tema
```

## 🔜 Próximos pasos

- [ ] Integrar Firebase Authentication
- [ ] Implementar validación de formularios
- [ ] Agregar pantalla de recuperación de contraseña
- [ ] Implementar persistencia de sesión
- [ ] Agregar pantallas de la red social (feed, perfil, etc.)

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