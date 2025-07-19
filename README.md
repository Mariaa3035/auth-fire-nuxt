# Auth Fire Vue Nuxt
A modern Nuxt.js application featuring Firebase authentication integration, with comprehensive user management and security features.
## Key Features
- 🔐 **Advanced Authentication**
  - Email/Password Registration
  - Secure Login System
  - Session Management
  - Protected Route Guards
  - Auto Logout Functionality
- 🎨 **UI/UX Components**
  - Bootstrap Vue Integration
  - Responsive Design
  - Form Validation (Vuelidate)
  - Loading States
  - Error Handling
- ⚡ **Security Features**
  - Auto Session Timeout
  - Activity Tracking
  - Secure Route Protection
  - Firebase Security Rules
## Tech Stack
- Nuxt.js (v2.x)
- Vue.js
- Firebase Authentication
- Bootstrap Vue
- Vuelidate
- Vuex State Management
## Prerequisites
- Node.js (v12 or higher)
- NPM or Yarn
- Firebase Account
- Git
## Quick Start

bash

Clone the repository
git clone https://github.com/yourusername/auth-fire-vue-nuxt.git

Install dependencies
npm install

Configure environment variables
cp .env.example .env

Start development server
npm run dev

Build for production
npm run build
npm run start

Generate static project
npm run generate

## Project Structure

auth-fire-vue-nuxt/
├── components/          # Reusable Vue components
│   ├── AuthGuard.vue   # Authentication wrapper
│   ├── Nav.vue         # Navigation component
│   └── ...
├── layouts/            # Page layouts
│   └── default.vue     # Default layout
├── middleware/         # Nuxt middleware
│   ├── auth.js         # Auth protection
│  
├── pages/             # Application routes
│   ├── index.vue      # Home page
│   ├── signin.vue     # Login page
│   ├── signup.vue     # Registration
│   └── dashboard.vue  # User dashboard
├── plugins/           # Vue plugins
│   ├── firebase.js    # Firebase config
│   ├── auth.js        # Auth plugin
│   └── vuelidate.js   # Form validation
├── store/             # Vuex store
│   ├── index.js       # Store root
│   └── auth.js        # Auth module
└── lib/              # Utilities
    └── api.js        # API handlers

## Firebase Setup
1. Create a project in [Firebase Console](https://console.firebase.google.com)
2. Enable Email/Password authentication
3. Copy your Firebase configuration
4. Create `.env` file with your Firebase credentials:

env
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

## Security Best Practices
- Firebase API keys are domain-restricted
- All routes are protected by middleware
- Session timeout is configurable
- Automatic token refresh
- Activity-based session extension
## Development Guide
- Run `npm run dev` for hot-reload development
- Use `npm run lint` to check code style
- Follow Vue.js best practices
- Implement proper error handling
- Test authentication flows thoroughly
## License
[MIT License](LICENSE)
## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

