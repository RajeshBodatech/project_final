# Hop-AI

A modern, responsive web application for mental health support, featuring AI-powered chat, mood tracking, and more.

---

## 📁 Project Structure

```
/src
  /assets         # Static assets (images, etc.)
  /pages
    Home.jsx      # Home/Landing page
    About.jsx     # About the project
    Contact.jsx   # Sign Up page (with OTP and animated modal)
    Login.jsx     # Login page (with animated modal)
  /images         # Image assets used in the UI
  ...
```

---

## 🧑‍💻 Main Features

- **Home Page**:  
  Responsive landing page with a hero section and feature highlights.  
  Image and text are centered and adapt to all screen sizes.

- **About Page**:  
  Animated, informative section about the project and its features.

- **Sign Up (Contact.jsx)**:  
  - Role-based signup (Admin, User, Doctor)
  - Animated modal using [framer-motion](https://www.framer.com/motion/)
  - OTP simulation for phone verification
  - Password field included
  - Responsive and accessible

- **Login Page**:  
  - Role-based login
  - Animated modal with smooth transitions

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

> **Note:**  
> This project uses `framer-motion` and `react-icons`.  
> If you add new dependencies, run `npm install <package>`.

### 2. Start the development server

```bash
npm run dev
```
or
```bash
npm start
```

### 3. Open in your browser

Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## ⚙️ Backend

- **Currently, there is no backend implemented.**
- OTP and authentication are simulated on the frontend.
- To add backend functionality, you can use Node.js/Express, Django, etc.
- Typical backend endpoints:
  - `/api/send-otp`
  - `/api/verify-otp`
  - `/api/signup`
  - `/api/login`

---

## 📝 Notes for Group Members

- All UI is responsive and uses Tailwind CSS utility classes.
- All modals and transitions use [framer-motion](https://www.framer.com/motion/).
- To change images, update files in `/images` or `/assets`.
- For backend integration, update the handlers in `Contact.jsx` and `Login.jsx` to call your API.
- If you encounter missing packages, run `npm install` again.

---

## 📦 Useful Commands

- `npm install` — Install all dependencies
- `npm run dev` — Start development server
- `npm run build` — Build for production

---

## 👥 Contributors

- Add your names here!

---

## 📄 License

MIT (or specify your license here)
