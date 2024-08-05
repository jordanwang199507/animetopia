# 🎢 Animetopia

### Simple CRUD application written with Next JS, Tailwind CSS, MongoDB and Google Authentication. This small application allow uers to create detailed records of your favorite anime and keep track of your current seasons and episodes. Easily organize your anime collection by watch status into lists such as In Progress, Future Watch, and Finished.

[![made-with-Next](https://img.shields.io/badge/Made%20with-Next.js%20-success)](https://nextjs.org/)
[![made-with-React](https://img.shields.io/badge/Made%20with-MongoDB%20-blue)](https://www.mongodb.com/)
[![made-with-Tailwind](https://img.shields.io/badge/Made%20with-Tailwind%20-yellow)](https://tailwindcss.com/)
[![made-with-GoogleCloud](https://img.shields.io/badge/Made%20with-GoogleCloud%20-orange)](https://console.cloud.google.com/)

## 📑 Table of Content

## 🧋Future Update
- Deploy application
- Complete README.md write up 

## 🚀 Getting Started

1. Clone the respository <br>
   `git clone https://jordanwang199507/animetopia`
2. Navigate to the repo<br>
   `cd animetopia`
3. Install all the depndencies <br>
   `npm install`
4. Set up a new Google Cloud project
5. Navigate to Google Cloud APIs & Services and then OAuth consent screen page
6. Once created, navigate back to Google Cloud Credentials and select + Create Credentials
7. Select OAuth Client ID and please select Web Application as the type
8. Under Authorized JavaScript origins and Authorized redirect URIs → enter http://localhost:3000
9. Add another Authorized redirect URIs → http://localhost:3000/api/auth/callback/google
10. Once complete, please select complete
11. Copy the given Client ID and secret back to .env file (template below)
   ```
    GOOGLE_ID=
    GOOGLE_CLIENT_SECRET=
   ```
12. Setup MongoDB → create new project → cluster → free M0 tier
13. Set up connection → Drivers
14. Copy and add connection string into .env
   ```
    GOOGLE_ID=
    GOOGLE_CLIENT_SECRET=
    MONGODB_URI=
   ```
15. In terminal enter “openssl rand -base64 32”
16. enter result in NEXTAUTH_SECRET in .env file 
17. Update .env file
   ```
    GOOGLE_ID=
    GOOGLE_CLIENT_SECRET=
    MONGODB_URI=
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_URL_INTERNAL=http://localhost:3000
    NEXTAUTH_SECRET=
   ```
18 Run the server

   ```sh
   npm run dev
   ```
