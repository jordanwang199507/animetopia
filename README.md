# 🎢 Animetopia

### Simple CRUD application written with Next JS, Tailwind CSS, MongoDB and Google Authentication. This small application allow uers to create detailed records of your favorite anime and keep track of your current seasons and episodes. Easily organize your anime collection by watch status into lists such as In Progress, Future Watch, and Finished.

[🚙 Live Version](https://animetopia-nine.vercel.app/)

[![made-with-Next](https://img.shields.io/badge/Made%20with-Next.js%20-success)](https://nextjs.org/)
[![made-with-MongoDB](https://img.shields.io/badge/Made%20with-MongoDB%20-blue)](https://www.mongodb.com/)
[![made-with-Tailwind](https://img.shields.io/badge/Made%20with-Tailwind%20-yellow)](https://tailwindcss.com/)
[![made-with-GoogleCloud](https://img.shields.io/badge/Made%20with-GoogleCloud%20-orange)](https://console.cloud.google.com/)
[![deployed-on-Vercel](https://img.shields.io/badge/Deployed%20on-Vercel%20-orange)](https://vercel.com/)

## 📑 Table of Content
- [🎢 Animetopia](#-animetopia)
  - [📑 Table of Content](#-table-of-content)
  - [🚀 Getting Started](#-getting-started)
  - [🧱 Main Structure](#-main-structure)
  - [📘 Tech Stack](#-tech-stack)
  - [🔨 Created By](#-created-by)

## 📷 Thumbnails
![Screen Shot 2024-08-05 at 11 56 27 AM](https://github.com/user-attachments/assets/69f30226-f16b-48bb-af85-26c4414761da)

## 🌟 Features
- Sign In:
  
https://user-images.githubusercontent.com/107829745/987ba02a-9427-4e12-adbf-e0ef73f070f2.mp4

- Create Post:
  
https://github.com/user-attachments/assets/ab588900-d13a-4472-9fcf-c8782efcd0da

- Edit Post:
  
https://github.com/user-attachments/assets/572d76d9-f108-4ce8-a998-46338af9975b

- Change Status:
  
https://github.com/user-attachments/assets/6028be6e-1f7e-4c71-b183-f6a6d3c9a935

- Search Post:
  
https://github.com/user-attachments/assets/36e7c0f8-4dfb-4acf-b962-83bf333588af

- Update Season/Episode:
  
https://github.com/user-attachments/assets/e3e288bf-0389-47dd-bc2c-062af8cd9a88

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

## 🧱 Main Structure
```sh
├── app
│  ├── api                 # contains api route for adjust DB
│  │    ├── auth           # login authorization route
│  │    │    └── [...nextauth] 
│  │    ├── post           # api for adjusting post
│  │    │    ├── [id] 
│  │    │    └── new
│  │    └── users
│  │         └── [id]
│  │              └── posts
│  ├── create-post         # create-post route 
│  ├── profile             
│  ├── update-post         
│  ├── layout.jsx            
│  └── page.jsx                 
├── components              # contains reusable components
├── models                  # mongoDB models
├── public                  # storing assets
│  └── assets
├── styles                  # where global.css resides
├── utils                   # setting up database connection
├── .env                     # ensure to update this file with the correct credentials when deploying
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── tailwind.config.js       # contains tailwind global variables
└── README.md
```

## 📘 Tech Stack
- [React](https://react.dev/)
- [NextJS](https://nextjs.org/) 
- [MongoDB](https://www.mongodb.com/)
- [Google API](https://console.cloud.google.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Next-Auth](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)

## 🔨 Created By

- Jordan Wang @jordanwang199507
