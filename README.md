# MindfulAI Mood Note

An enhanced intelligent mood tracking journal with dynamic themes, emoji inputs, and data export capabilities, powered by Gemini 2.5.

---

## 🚀 Live Application

**Live App Link:** [https://mindfulai-mood-note-166845208052.us-west1.run.app](https://mindfulai-mood-note-166845208052.us-west1.run.app)

---

## 🛠️ Run Locally and Development

This repository contains everything you need to run and develop your app.

**Prerequisites:** Node.js

### Steps

1.  **Install dependencies:**
    In the project root directory, run the following command:
    ```bash
    npm install
    ```

2.  **Set the Gemini API Key:**
    The AI analysis feature requires the `GEMINI_API_KEY`. Set this key in a file named `.env.local` in the root of your project. The Vite configuration handles making this available to the app.
    ```
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

3.  **Run the app:**
    Run the app in development mode:
    ```bash
    npm run dev
    ```

### Production Build

To create a production-ready build for deployment, use the following command:
```bash
npm run build
# The optimized static files will be generated in the `dist` folder.
