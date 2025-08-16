# 📊 Personal Expense Tracker (MERN)

A full-stack **MERN application** to track personal expenses.  
Users can add, view, edit, and delete expenses with validations.  
Frontend built with **React + Tailwind CSS**, backend with **Node.js + Express + MongoDB**.

---


### 🔗 Live Demo

- **Visit Website**: [Live Site on Firebase](https://expense-tracker-5bc64.web.app/) 

## 🚀 Features

- Add expenses with **title, amount, category, and date**
- View all expenses in a list/table layout
- Edit and delete existing expenses
- Show **total expenses** at the top
- Category badges: Food, Transport, Shopping, Others
- Fully responsive (mobile, tablet, desktop)
- Pie chart of expenses by category (Recharts)
- JWT-Firebase authentication

---

## ⚙️ Tech Stack

- **Frontend**: React.js , Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB Atlas
- **Deployment**: Firebase (frontend) + Vercel (backend)

---

### ✅ Validation

- `title`: required, minimum 3 characters
- `amount`: required, must be a number > 0
- `date`: required, valid date

---

## 🖥️ Run Locally

You need to run the **backend** and **frontend** separately.

---

### 1️⃣ Clone Repositories

````bash
# Clone backend
git clone https://github.com/KhalidTheCoder/personal-expense-tracker-server
cd personal-expense-tracker-server

# Clone frontend (in a separate folder)
git clone https://github.com/KhalidTheCoder/personal-expense-tracker-client


2️⃣ Backend Setup (Node.js + Express + MongoDB)

cd personal-expense-tracker-server
npm install


Create a .env file inside the backend folder:

DB_USER=yourMongoUser
DB_PASS=yourMongoPassword
FB_SERVICE_KEY=yourFirebaseServiceKey

⚠️Note: FB_SERVICE_KEY should be your Firebase Admin SDK JSON, encoded in Base64.

Run the Backend server:
npm run dev

➡️ Backend will be running at: http://localhost:5000


3️⃣ Frontend Setup

cd ../personal-expense-tracker-client
npm install

Create a .env.local file inside the frontend folder:

VITE_apiKey=yourFirebaseApiKey
VITE_authDomain=yourFirebaseAuthDomain
VITE_projectId=yourFirebaseProjectId
VITE_storageBucket=yourFirebaseStorageBucket
VITE_messagingSenderId=yourFirebaseMessagingSenderId
VITE_appId=yourFirebaseAppId

4️⃣ Run Frontend server:
npm run dev

➡️ Frontend will be running at: http://localhost:5173 (default Vite port)


5️⃣ Usage

Start the backend first (npm run dev in personal-expense-tracker-server).

Then start the frontend (npm run dev in personal-expense-tracker-client).

Open http://localhost:5173 in your browser.

Add, edit, and delete expenses — data will be stored in MongoDB via your backend API.

````
