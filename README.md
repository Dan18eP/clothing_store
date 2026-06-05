# Clothing Store Inventory Management SPA

A modern, high-performance Single Page Application (SPA) for internal inventory management, built with Vanilla JavaScript and professional architecture.

## 🚀 Features

- **Single Page Application (SPA)**: Custom router using History API for seamless navigation without page reloads.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Full CRUD capabilities on products and global dashboard metrics.
  - **Seller**: Limited access to assigned products, stock updates, and specific dashboard metrics.
- **Authentication**: Secure login system with session persistence using `localStorage`.
- **Advanced Inventory Management**:
  - Full CRUD for products.
  - Real-time search by name.
  - Filters by category, stock status (In stock, Out of stock, Low stock).
- **Modern UI/UX**:
  - Utility-first styling with **Tailwind CSS**.
  - **Dark Mode** support with system preference detection and persistence.
  - **Toast Notifications** for user feedback.
  - **Global Loader** for API requests.
  - Responsive design for all devices.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules).
- **Styling**: Tailwind CSS (CDN).
- **Backend (Mock)**: `json-server`.
- **Architecture**: Modular class-based components.

## 📁 Project Structure

```
src/
├── api/          # Generic API client and fetch logic
├── auth/         # Login/Logout and authentication services
├── router/       # SPA Router with route guards
├── views/        # Page views (Login, Dashboard, Products)
├── components/   # Reusable UI components (Navbar, Modal, Base)
├── services/     # Business logic and store management
├── utils/        # Utility functions (Notifications, DOM)
├── styles/       # (Internal Tailwind config and base styles)
├── guards/       # Route protection logic
└── main.js       # Application entry point
```

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd clothing-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the simulated backend (API):
   ```bash
   npm run api
   ```

4. Start the development server (Vite):
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:3000`.

## 🔑 Demo Credentials

- **Admin**: `admin@store.com` / `123456`
- **Seller**: `seller@store.com` / `123456`

## 📘 Design Principles

- **Vite Power**: Fast development with HMR and optimized builds.
- **Path Aliases**: Clean imports using the `@` alias for the `src` directory.
- **Clean Code**: Highly readable and maintainable code following SOLID principles.
- **Modularity**: Every feature is encapsulated in its own module/service.
- **Security**: Route guards prevent unauthorized access to restricted views based on role and auth status.
- **Event Delegation**: Efficient DOM event handling.

## 📝 License

This project is licensed under the MIT License.
