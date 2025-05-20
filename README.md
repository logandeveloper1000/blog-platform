
# Logan Blog Platform

A full-featured blog application built with React and Firebase, allowing authenticated users to create, edit, and delete blog posts. Posts can be marked as public or private, and an admin user has the ability to approve posts before they appear on the homepage.

## Live Demo

You can view the live app here:  
https://logan-blog-platform.netlify.app/

## Technologies Used

- React
- React Router
- Firebase Authentication
- Firebase Firestore (NoSQL Database)
- Firebase Admin Claims
- CSS

## Features

### User Features
- Register and login via Firebase Auth
- Create, edit, and delete your own blog posts
- Choose whether a post is public or private
- See the approval status of your post
- Responsive UI design

### Admin Features
- Login via a secure `/Admin` URL
- View and approve pending posts
- Approved posts show up on the public homepage

### Homepage
- Displays only public, approved posts
- Posts are aligned to the left for a clean reading experience
- Accessible to all users (even without logging in)

## Firestore Security Rules

- Only post owners can update or delete their posts
- Only admins can approve posts
- Public users can only view approved, public posts

## File Structure Overview

- `src/components` – Reusable UI components (PostList, Modal, etc.)
- `src/pages` – Login, Register, Dashboard, Home, Admin
- `src/context` – AuthContext for authentication and modal management
- `firebase.js` – Firebase configuration and initialization
- `index.css` – Project-wide styles

## Deployment

This project is deployed via Netlify.

To deploy manually:

1. Build the project:
   ```
   npm run build
   ```
2. Deploy the `/build` folder to Netlify, Vercel, or Firebase Hosting.

## Setup

1. Clone the repo
2. Run `npm install`
3. Add your Firebase config to `firebase.js`
4. Ensure Firestore rules are correctly configured

---

© 2024 Logan Developer – All rights reserved.
