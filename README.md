# React + Vite

Este proyecto es una aplicación desarrollada con React y Vite, diseñada como un juego educativo para la gestión organizacional en la gestión de proyectos. La aplicación incluye múltiples páginas y componentes interactivos que ayudan a los usuarios a aprender conceptos clave de una manera divertida y práctica.

## Características principales

- **React + Vite**: Configuración mínima para trabajar con React y Vite, incluyendo HMR (Hot Module Replacement) para un desarrollo más rápido.
- **Tailwind CSS**: Estilización moderna y eficiente con Tailwind CSS.
- **Componentes reutilizables**: Uso de hooks y componentes personalizados para una experiencia de usuario dinámica.
- **Páginas interactivas**: Incluye páginas como "Home", "Learning", "Level One" y un tablero de Monopoly personalizado.
- **Integración de hooks**: Ejemplos prácticos de hooks como `useState`, `useEffect` y más.

## Estructura del proyecto

```
Laberinto-Gp/
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── vite.svg
├── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   └── react.svg
    ├── components/
    │   ├── hooks/
    │   │   ├── Contador.jsx
    │   │   ├── UseEfecct.jsx
    │   │   ├── UseStateForm.jsx
    │   │   └── useEffect/
    │   │       ├── Fetching.jsx
    │   │       ├── UseEffectExample.jsx
    │   │       └── useFetch.js
    │   └── Props/
    │       ├── PropDestucturing.jsx
    │       ├── PropsChildren.jsx
    │       └── PropsComponente.jsx
    └── pages/
        ├── home.jsx
        ├── Learning.jsx
        ├── LevelOne.jsx
        ├── MonopolyBoard.jsx
        └── MonopolyBoard copy.jsx
```

## Requisitos previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/JonathanArroyaveGonzalez/Laberinto-Gp
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd Laberinto-Gp
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución del proyecto

Para iniciar el servidor de desarrollo, ejecuta:
```bash
npm run dev
```
Esto abrirá la aplicación en tu navegador en `http://localhost:3000` (o el puerto configurado).

## Construcción para producción

Para construir la aplicación para producción, ejecuta:
```bash
npm run build
```
Los archivos generados estarán en la carpeta `dist/`.

## Contribuciones

Si deseas contribuir a este proyecto, por favor abre un issue o envía un pull request en el repositorio oficial: [Laberinto-Gp](https://github.com/JonathanArroyaveGonzalez/Laberinto-Gp).

## Licencia

Este proyecto está bajo la licencia MIT.
