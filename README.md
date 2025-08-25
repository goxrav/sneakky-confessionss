 Project Title

sNeAkkY CoNFesSIOns


**sNeAkkY CoNFesSIOns** is a full-stack web application designed for users to post and read anonymous confessions. The platform encourages open sharing without fear of judgment, offering features like emoji reactions, reporting inappropriate content, and an admin dashboard for moderation. The responsive design ensures a seamless experience across devices, and the modern UI is powered by Tailwind CSS and Framer Motion.




### Component Structure

- **`src/components/Herosection.jsx`**  
  Hero section with animated title and call-to-action buttons.

- **`src/components/ConfessionPreview.jsx`**  
  Shows a preview of recent confessions.

- **`src/components/HowItWorks.jsx`**  
  Explains how the confession board works.

- **`src/components/Footer.jsx`**  
  App footer.

- **`src/pages/Home.jsx`**  
  Main landing page, combines all sections.

- **`src/contexts/ThemeContext.js`**  
  Provides dark/light mode context.

### Styling

- Uses [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- Custom animations and effects are defined in `src/index.css`.

### Routing

- Uses [React Router](https://reactrouter.com/) for navigation between pages.

### Adding a New Confession

1. Go to the "Confess Now" button on the home page.
2. Fill in your confession and submit anonymously.

### Reporting a Confession

- Click the report button on any confession to flag it for moderation.

---
## Features


##  🗂️ Project Structure

confession-board/

  backend/

    config/
    controllers/
    middlewares/
    models/
    routes/
    .env
    package.json
    server.js

  frontend/

    public/
    src/
      components/
      contexts/
      pages/
      App.js
      index.js
      index.css

    package.json
    tailwind.config.js
    postcss.config.js

🚀 Getting Started
## Prerequisites

Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)


## ### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/sneakky-confessions.git
cd confession-board
```

---

##  2. Setup Backend
```sh
cd backend
npm install

Create a `.env` file in `backend/`:

  ```
  MONGO_URI=your_mongodb_connection_string
  ```

- Start the backend server:
```sh
  npm run dev
  # or
  npm start
  ```

  The backend runs on [http://localhost:5000](http://localhost:5000).

---


## 3. Setup Frontend

```sh
cd ../frontend
npm install
```
- Start the frontend dev server:

  ```sh
  npm start
  ```

  The frontend runs on [http://localhost:3000](http://localhost:3000).

---
## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion, React Router, Sonner (toasts), React Icons
- **Backend:** Node.js, Express, Mongoose, MongoDB
- **Other:** UUID, Axios, Confetti, use-sound


## 🧑‍💻 Development Scripts

From the `frontend/` directory:

- `npm start` — Start React dev server
- `npm run build` — Build for production
- `npm test` — Run tests

From the `backend/` directory:

- `npm run dev` — Start backend with nodemon
- `npm start` — Start backend

---
## 🔒 Admin Access

Visit `/admin` to login as admin.
- Default credentials (for demo):  
  - Username: `admin`
  - Password: `password123`
- Change password in the dashboard.

---

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Backend (`backend/.env`):**

```
MONGO_URI=your_mongodb_connection_string
```

---



##  🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.



## 📄License

[MIT]


## 🙋‍♂️ Authors
 [Gaurav Mehan](https://github.com/goxrav)
 



## Support

Give a ⭐️ if you like this project!


## Installation

**Clone the repository**
   ```sh
   git clone https://github.com/yourusername/confession-board.git
   cd confession-board/frontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

4. **(Optional) Backend Setup**
   - If your project uses a backend, navigate to the `backend` folder and follow similar steps:
     ```sh
     cd ../backend
     npm install
     npm run dev
     ```
   - Make sure to configure your environment variables (like `MONGO_URI`) in a `.env` file in the backend directory.

    
## Roadmap



[x] Anonymous confession submission
- [x] Emoji reactions to confessions
- [x] Confession reporting and moderation
- [x] Admin dashboard for managing confessions
- [x] Dark mode and responsive design
- [x] Animated hero section and UI polish
- [ ] User authentication (optional/future)
- [ ] Real-time updates (WebSockets)
- [ ] Mobile app version
