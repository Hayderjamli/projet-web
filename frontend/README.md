# UtopiaHire - Career Platform Frontend

## 1. Objective
This website helps users prepare for job applications and interviews by providing AI-powered tools for CV analysis, skills gap detection, and interview practice. The goal is to make career preparation easier and more effective.

## 2. Services Offered
- **CV Analysis & Optimization**: Upload your CV and get instant feedback and improvement suggestions.
- **Skills Gap Analyzer**: Compare your skills to job requirements and get a personalized learning plan.
- **Interview Practice**: Simulate interviews and receive feedback (mocked for demo).
- **User Dashboard**: Track your progress and access all tools in one place.

## 3. Technologies Used & Why
- **React**: Component-based UI, fast rendering, large ecosystem.
- **TypeScript**: Type safety, better code quality, easier maintenance.
- **Vite**: Fast development server and build tool, instant HMR.
- **Tailwind CSS**: Utility-first CSS for rapid and consistent styling.
- **React Router**: SPA navigation and protected routes.
- **Context API**: Global state management for authentication and services.
- **Mock API**: Simulates backend for frontend development and demo.

## 4. How to Run
1. Install Node.js (v18+ recommended).
2. In the `frontend` folder, run:
   ```bash
   npm install
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 5. How to Test the Interface
- After running `npm run dev`, open [http://localhost:5173](http://localhost:5173).
- Use the following mock user credentials to log in:
  - **Email:** demo@example.com
  - **Password:** demo123
- All features (CV analysis, skills gap, dashboard, interview) work with simulated/mock data. No backend is required.
- You can also register a new user for testing; the data will be stored in memory for the session.

## 6. Professional Repo Essentials
- `src/` folder: All source code (components, pages, contexts, mock API).
- `public/` folder: Static assets.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `tailwind.config.js`: Tailwind CSS setup.
- `vite.config.ts`: Vite build configuration.
- `.env.example`: Example environment variables (optional).
- `README.md`: Project overview and instructions (this file).

---
For any questions or contributions, please open an issue or pull request.
