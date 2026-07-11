# 🤖 AI Resume Builder & Optimizer

A premium, interactive, client-side web application designed to help professionals build, optimize, and export ATS-friendly resumes. Built with **Vite, Vanilla JS, and Vanilla CSS**, it features **OpenRouter AI integration** to rewrite bullet points and generate summaries, and exports directly to polished **A4 PDFs**.

## ✨ Features

* 🚀 **Real-time Live Preview**: See changes instantly on an A4 sheet layout as you type.
* 🎨 **3 Premium Templates**:
  * **Modern Minimalist**: Single-column layout with clean margins and professional sans-serif typography.
  * **Professional Slate**: Dual-column layout featuring an elegant sidebar for structural information density.
  * **Creative Indigo**: Full bleed gradient headers with modern tag blocks for skills.
* 🤖 **AI Content Optimizations**:
  * **Optimize Bullet Points**: Refines job description notes into action-oriented, results-focused achievements.
  * **Summary Generator**: Crafts a targeted 3-4 sentence professional summary based on entered skills and titles.
* 📥 **Pixel-Perfect PDF Export**: Client-side A4 export using `html2pdf.js` with page-break safety features to ensure clean page printing.
* 🌗 **Dark Mode & Light Mode**: Premium, glassmorphic dark-theme console with an easy toggle to light theme.
* 🔐 **Secure & Private**: Operates entirely client-side. Your OpenRouter API key is stored in your browser's local storage and only communicates directly with the OpenRouter endpoint.

---

## 🛠️ Technology Stack

* **Core**: HTML5, Vanilla JavaScript (ES6+ Modules)
* **Styling**: Vanilla CSS3 (Custom design system with CSS properties, glassmorphism, responsive media layouts)
* **Bundler & Server**: Vite
* **AI Provider Integration**: OpenRouter API (RESTful Client)
* **PDF Engine**: `html2pdf.js` (Canvas + jsPDF)
* **Icons**: Lucide Icons

---

## ⚡ Quick Start & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone the repository
```bash
git clone https://github.com/kushal-at/Ai-resume-builder-VITE.git
cd Ai-resume-builder-VITE
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application!

### 4. Build for production
To compile and minify the project into static assets for production:
```bash
npm run build
```
The output will be generated inside the `/dist` directory.

---

## ⚙️ OpenRouter API Configuration

This application leverages the **OpenRouter API** to provide access to state-of-the-art open-source LLMs like Llama 3, Gemini, Qwen, etc.

1. Create a free account at [OpenRouter.ai](https://openrouter.ai/).
2. Navigate to your dashboard and generate an **API Key**.
3. Open the Resume Builder app, click on **API Settings** in the header.
4. Paste your key and select your preferred model (e.g. `meta-llama/llama-3-8b-instruct:free`).
5. Start optimizing your resume content!

---

## 🚀 Deploying to Vercel

Since this is a static project, deploying to Vercel takes less than a minute:

1. Push your code changes to your GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New** -> **Project**.
3. Import your `Ai-resume-builder-VITE` repository.
4. Vercel will automatically detect the **Vite** configuration. Click **Deploy**.
5. Your application is live! 🎉
