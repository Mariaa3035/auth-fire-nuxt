# Auth Fire Nuxt
A Nuxt.js application with Firebase authentication integration, featuring user registration, login, and session management.
## Features
- 🔐 User Authentication with Firebase
  - Email/Password Sign Up
  - Email/Password Sign In
  - Automatic Session Management
  - Protected Routes
- ⚡ Auto Logout Timer
- 🎨 Bootstrap Vue Integration
- ✨ Form Validation with Vuelidate
## Prerequisites
- Node.js (v12 or higher)
- NPM or Yarn
- Firebase Account and Project
## Build Setup
```bash
# Install dependencies
npm install
# Serve with hot reload at localhost:3000
npm run dev
# Build for production and launch server
npm run build
npm run start
# Generate static project
npm run generate

## Project Structure
auth-fire-nuxt/
├── components/          # Vue components
├── layouts/            # Page layouts
├── middleware/         # Navigation guards
│   ├── auth.js        # Authentication middleware
│   └── guest.js       # Guest access middleware
├── pages/             # Application views and routes
│   ├── index.vue      # Home page
│   ├── login.vue      # Login page
│   ├── signup.vue     # Registration page
│   └── dashboard.vue  # Protected dashboard
├── plugins/           # Plugin configurations
│   ├── firebase.js    # Firebase initialization
│   ├── auth.js        # Auth state plugin
│   └── vuelidate.js   # Form validation
├── store/             # Vuex store modules
│   └── auth.js        # Authentication store
## Firebase Configuration
1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com)
2. Enable Email/Password authentication in the Authentication section
3. Copy your Firebase configuration from Project Settings
4. Update the configuration in `plugins/firebase.js`:

javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
## Authentication Features
- **Sign Up**: New user registration with email and password
- **Login**: User authentication with email and password
- **Protected Routes**: Middleware-based route protection
- **Auto Logout**: Automatic session timeout management
- **Activity Tracking**: Session extension based on user activity
## Development
For detailed explanation on how things work, check out the [Nuxt.js docs](https://nuxtjs.org).
## Security Notes
- Firebase API keys are restricted by domain and can be safely included in client-side code
- Session timeout is configurable in the auth store
- All authentication state is managed through Vuex store
## License
[MIT License](LICENSE)# auth-fire-nuxt
