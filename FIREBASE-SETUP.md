# 🔥 Firebase + Netlify Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it "clickbyazmi-gallery"
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firebase Services

### Enable Firestore Database:
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode"
4. Select location (closest to you)

### Enable Storage:
1. Go to "Storage"
2. Click "Get started"
3. Choose "Start in test mode"
4. Select location

## Step 3: Get Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web app" icon (</>)
4. Name it "clickbyazmi-web"
5. Copy the config object

## Step 4: Update Your Code

Replace this in `index.html`:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Step 5: Deploy to Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. "New site from Git"
4. Connect GitHub repo
5. Deploy!

## ✅ Features:
- ✅ Upload multiple images
- ✅ Firebase Storage (5GB free)
- ✅ Firestore Database
- ✅ Admin authentication
- ✅ Lightbox gallery
- ✅ Download images
- ✅ Works on Netlify

## 🔒 Security (Optional):
After testing, update Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /images/{document} {
      allow read: if true;
      allow write: if false; // Only allow through admin
    }
  }
}
```