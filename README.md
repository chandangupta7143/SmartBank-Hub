# Fusion Finance Frontend

## 💱 Global Currency System

The application uses a robust, live-rate currency conversion system.
- **Default Currency**: INR (₹)
- **Base Currency**: USD
- **Provider**: `exchangerate.host` (or configurable)

### Configuration
Manage settings in `.env`:
```env
VITE_EXCHANGE_API_URL=https://api.exchangerate.host/latest
VITE_USE_MOCKS=false # Set true to force offline mode
VITE_EXCHANGE_CACHE_TTL_MS=600000 # Cache duration (10 mins)
```

### Dev Tools
- **Mock Mode**: If API fails or `VITE_USE_MOCKS=true`, the app provides realistic mock rates (USD=1, INR=83.5, EUR=0.92).
- **Reset**: Use the "Reset App Data" in the Error Boundary or clear LocalStorage manually if rates get stuck.

A high-fidelity banking frontend built with React, Vite, Tailwind CSS v4, and Mock Data.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173)

## 🛠 Features (Fully Functional Mock Mode)
- **Auth**: Mock Login/Signup (no backend required).
- **Wallet**: Deposit/Withdraw simulation with loading states.
- **Transactions**: Infinite scroll history & live incoming websocket simulation.
- **P2P Transfer**: 
    - **Idempotency**: Prevents double-spending.
    - **Concurrency Test**: Simulate rapid double-clicks to verify safe locking.
- **QR Pay**: Generate personal codes and simulate scanning/payment.
- **Contacts**: Searchable list with Optimistic UI updates + Undo capability.
- **Admin**: Mock data management and balance overrides.
- **Theme**: Premium Dark/Light mode toggle.

### 🔐 Admin Portal (New)
The system includes an isolated Admin Portal for managing users, wallets, and KYC.
- **URL**: `/admin/login`
- **Credentials**:
  - Email: `admin@fusion.com`
  - Password: `admin123`

## 🧪 Testing
Run unit tests with Vitest:
```bash
npm test
```

## 🏗 Project Structure
- `src/api/mock`: Contains mock backend logic.
- `src/store`: Global state (Zustand).
- `src/pages`: Application views.
- `src/components/ui`: Reusable design system components.
- `src/hooks`: Logic encapsulation (useWallet, useSocketMock, etc).

## 🐳 Docker
Build and run with Docker:
```bash
docker build -t smartbank-frontend .
docker run -p 5173:5173 smartbank-frontend
```
