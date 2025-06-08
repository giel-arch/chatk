# Private Group Chat Application

A simple real-time group chat application built with HTML, CSS, JavaScript, and Firebase.

## Features

- Real-time messaging
- User identification
- Message history
- Responsive design
- Modern UI

## Setup Instructions

1. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup steps
   - Enable Firestore Database in your project

2. Get your Firebase configuration:
   - In Firebase Console, go to Project Settings
   - Scroll down to "Your apps" section
   - Click the web icon (</>)
   - Register your app and copy the configuration object

3. Update the Firebase configuration:
   - Open `script.js`
   - Replace the `firebaseConfig` object with your configuration

4. Deploy to GitHub Pages:
   - Create a new GitHub repository
   - Push these files to your repository
   - Go to repository Settings > Pages
   - Enable GitHub Pages and select your main branch

## Usage

1. Open the deployed website
2. Enter your name and click "Join Chat"
3. Start sending messages!

## Security Rules

Make sure to set up proper security rules in your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // For testing only
    }
  }
}
```

Note: For production, you should implement proper authentication and security rules.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Firebase (Firestore)
- GitHub Pages (for hosting) 