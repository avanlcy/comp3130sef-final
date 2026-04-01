# COMP3103SEF - Final Project

Development Emulator: Pixel 9 Pro

Since we are using Expo, it's a bit difficult to adopt traditional MVC structure. 

**Model**
- `models/` typescript interface (type safety)

**Views:**
- `app/` should only contains the screens (pages/routes)
- `components/` should be reusable components

**Controller**
- `services/` API calling, business logics
- `hooks` state management (Lecture 8) for function components
