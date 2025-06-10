# Ecommerce Angular

## 📋 Project Overview

This project is a modern, scalable, and user-friendly e-commerce platform frontend built with Angular. Users can browse products, add them to their cart, complete payments, and track their order history.

**Demo Website:** [https://ecommerce-angular-5ync.vercel.app/](https://ecommerce-angular-5ync.vercel.app/)

## 🚀 Features

- **User Authentication**
  - Registration & Login/Logout
  - Password reset and profile management

- **Product Management**
  - Product listing by category
  - Filtering and searching
  - Product detail pages

## 🛠️ Technologies Used

- **Angular**: Modern web application framework
- **RxJS**: Reactive programming
- **TailwindCSS**: Utility-first CSS framework
- **Zone.js**: Execution contexts for JavaScript
- **TypeScript**: Typed superset of JavaScript

## 📦 Dependencies

All dependencies are listed in the `package.json` file. Main dependencies:

```json
{
  "dependencies": {
    "@angular/common": "^19.2.0",
    "@angular/compiler": "^19.2.0",
    "@angular/core": "^19.2.0",
    "@angular/forms": "^19.2.0",
    "@angular/platform-browser": "^19.2.0",
    "@angular/platform-browser-dynamic": "^19.2.0",
    "@angular/router": "^19.2.0",
    "@tailwindcss/postcss": "^4.1.7",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.2.9",
    "@angular/cli": "^19.2.9",
    "@angular/compiler-cli": "^19.2.0",
    "@types/jasmine": "~5.1.0",
    "autoprefixer": "^10.4.21",
    "jasmine-core": "~5.6.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "postcss": "^8.5.3",
    "tailwindcss": "^4.1.7",
    "typescript": "~5.7.2"
  }
}
```

## 🔧 Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/servetisikli/ecommerce-angular.git
   cd ecommerce-angular
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Edit `src/environments/environment.ts` and `environment.prod.ts` as needed.
   ```ts
   export const environment = {
     production: false,
     apiUrl: 'https://your-api-url.com',
     stripePublicKey: 'your_stripe_public_key'
   };
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   Visit [http://localhost:4200](http://localhost:4200) in your browser.

5. For production build:
   ```bash
   npm run build
   ```

## 🔐 Authentication Flow

1. User registers and email verification is performed.
2. A JWT token is provided upon login.
3. Authenticated routes require the token.
4. Users can view their profile and order history.

## 📱 Application Routes

- `/` - Homepage
- `/login` - Login
- `/register` - Register
- `/product/:id` - Product details

## 👨‍💻 Author

- **Servet Isikli** - [GitHub Profile](https://github.com/servetisikli)

## 📅 Last Updated

- Date: 2025-06-10
- By: servetisikli

## 🔗 Links

- [Demo Website](https://ecommerce-angular-5ync.vercel.app/)
- [Repository](https://github.com/servetisikli/ecommerce-angular)
