# BeeNET - Campus Sports Hub

BeeNET is a modern campus athletic hub built for students to coordinate sports scrimmages, reserve campus court facilities, organize pick-up game sessions, and discuss training tips on an interactive forum.

The application features a React (Vite) frontend integrated with a local **PocketBase** backend database, supporting user authentication, collection querying, and persistent record storage.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

## Getting Started

### 1. Clone & Install Frontend Dependencies

```bash
npm install
```

### 2. Set Up the Local Backend (PocketBase)

We use a setup utility to automatically download the PocketBase Windows binary and install the initial migrations (schema, relations, and default sport emoji user profiles):

```bash
node setup_pocketbase.cjs
```

### 3. Run the Backend Server

Start the PocketBase server. This will run the database on `http://127.0.0.1:8090` and run the initial setup migration:

```bash
cd pocketbase
pocketbase.exe serve
```
*You can access the Web Admin Dashboard at `http://127.0.0.1:8090/_/` to see database collections and user credentials.*

### 4. Run the Frontend Development Server

In a new terminal window at the project root, start the Vite development server:

```bash
npm run dev
```
*Your app will be running on `http://localhost:5173`.*

---

## Default Seed Credentials

Use these pre-seeded accounts to log in and demo the application. Each department role unlocks specific screens:

| Department / Role | Email | Password |
| :--- | :--- | :--- |
| **Computer Science (Student)** | `kevinsukias27@gmail.com` | `user123` |
| **Admin** | `kevin.admin@binus.ac.id` | `admin123` |
| **Moderator** | `kevin.moderator@binus.ac.id` | `mod123` |

You can also use the **"Create Account"** feature on the login screen to register your own accounts with any custom username/email and password.

---

## Exposing Locally to Test with Friends

To demo this app with your friends remotely, you can use [ngrok](https://ngrok.com/) to tunnel your local servers:

1. Expose the **PocketBase Backend**:
   ```bash
   ngrok http 8090
   ```
2. Update the API URL in [src/pocketbase.ts](src/pocketbase.ts) to use the generated `ngrok` backend URL.
3. Expose the **Vite Frontend**:
   ```bash
   ngrok http 5173
   ```
4. Send the generated frontend `ngrok` URL to your friends so they can access the application, create accounts, and host matches in real-time.
