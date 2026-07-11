import './style.css';
import { createIcons, Settings, Download, Moon, Sun } from 'lucide';
import { FormBuilder } from './components/FormBuilder.js';
import { ResumePreview } from './components/ResumePreview.js';
import { enhanceBulletPoint, generateSummary } from './services/ai.js';
import { exportToPDF } from './utils/pdf.js';

// ----------------------------------------------------
// Default Mock Data for Portfolio Demo
// ----------------------------------------------------
const defaultState = {
  personal: {
    name: 'Kushal At',
    title: 'Senior Full Stack Engineer',
    email: 'kushal@dev.io',
    phone: '+1 (555) 872-9382',
    website: 'https://kushal.dev',
    linkedin: 'https://linkedin.com/in/kushal-at',
    github: 'https://github.com/kushal-at',
    summary: 'Innovative Full Stack Developer with 6+ years of experience constructing high-availability web systems. Expert in React, Node.js, and Cloud Infrastructure. Proven track record of reducing bundle sizes by 40% and optimizing DB execution plans.'
  },
  experience: [
    {
      company: 'Apex Solutions',
      role: 'Lead Developer',
      startDate: 'Mar 2022',
      endDate: 'Present',
      description: 'Architected micro-frontend systems using Vite module federation, dropping loading delays by 1.2s.\nManaged a team of 5 backend developers to build serverless REST APIs servicing 15,000 requests per minute.'
    },
    {
      company: 'BitSystems Inc.',
      role: 'Software Engineer II',
      startDate: 'Jun 2019',
      endDate: 'Feb 2022',
      description: 'Optimized PostgreSQL queries that cut average request execution latency from 240ms to 45ms.\nSpearheaded testing migrations to Jest resulting in test suite coverage increasing from 50% to 92%.'
    }
  ],
  projects: [
    {
      name: 'Vite Resume Engine',
      link: 'https://github.com/kushal-at/Ai-resume-builder-VITE',
      description: 'Created a highly responsive lightweight CSS component framework with glassmorphism presets. Acquired 1,200+ stars on GitHub.'
    }
  ],
  education: [
    {
      institution: 'State Tech University',
      degree: 'B.S. in Computer Science',
      startDate: '2015',
      endDate: '2019',
      details: 'Magna Cum Laude. President of Open Source Student Association.'
    }
  ],
  skills: ['JavaScript (ES6+)', 'Node.js', 'React', 'Vite', 'PostgreSQL', 'Docker', 'Amazon Web Services', 'TypeScript', 'TailwindCSS']
};

// ----------------------------------------------------
// State Management
// ----------------------------------------------------
let appState = JSON.parse(localStorage.getItem('ai_resume_builder_state')) || defaultState;
let apiKey = localStorage.getItem('openrouter_api_key') || '';
let selectedModel = localStorage.getItem('openrouter_model') || 'meta-llama/llama-3-8b-instruct:free';
let currentTemplate = localStorage.getItem('resume_template') || 'modern';
let appTheme = localStorage.getItem('theme') || 'dark';

// ----------------------------------------------------
// DOM Elements Selection
// ----------------------------------------------------
const editorContainer = document.getElementById('editor-container');
const resumeSheetTarget = document.getElementById('resume-sheet-target');
const templateSelect = document.getElementById('template-select');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const exportPdfBtn = document.getElementById('export-pdf-btn');

// Zoom elements
const scaleSlider = document.getElementById('preview-scale-slider');
const scaleValue = document.getElementById('preview-scale-value');
const resumeWrapper = document.getElementById('resume-wrapper');

// Modal Elements
const settingsModal = document.getElementById('settings-modal');
const settingsOpenBtn = document.getElementById('settings-open-btn');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const settingsCancelBtn = document.getElementById('settings-cancel-btn');
const settingsSaveBtn = document.getElementById('settings-save-btn');
const keyInput = document.getElementById('openrouter-key-input');
const modelSelect = document.getElementById('openrouter-model-select');

// ----------------------------------------------------
// Component Instantiations
// ----------------------------------------------------
const preview = new ResumePreview(resumeSheetTarget, currentTemplate);

const formBuilder = new FormBuilder(
  editorContainer,
  appState,
  // 1. OnUpdate Callback
  (newState) => {
    appState = newState;
    localStorage.setItem('ai_resume_builder_state', JSON.stringify(appState));
    preview.update(appState);
  },
  // 2. OnAIEnhance Callback (Bullet Point Optimization)
  async (text, jobTitle) => {
    if (!apiKey) {
      triggerSettingsModal();
      throw new Error('API Key missing. Enter your OpenRouter key to use AI features.');
    }
    return enhanceBulletPoint(text, jobTitle, apiKey, selectedModel);
  },
  // 3. OnAISummary Callback (Profile Summary Generation)
  async (skills, roles) => {
    if (!apiKey) {
      triggerSettingsModal();
      throw new Error('API Key missing. Enter your OpenRouter key to use AI features.');
    }
    return generateSummary(skills, roles, apiKey, selectedModel);
  }
);

// ----------------------------------------------------
// Helper Functions
// ----------------------------------------------------
function applyZoom(zoomVal) {
  scaleSlider.value = zoomVal;
  scaleValue.textContent = `${zoomVal}%`;
  resumeWrapper.style.transform = `scale(${zoomVal / 100})`;
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    themeToggleBtn.innerHTML = `<svg data-lucide="sun" width="18" height="18"></svg>`;
  } else {
    document.body.classList.remove('light-mode');
    themeToggleBtn.innerHTML = `<svg data-lucide="moon" width="18" height="18"></svg>`;
  }
  createIcons(); // Re-render Lucide icons inside the button
}

function triggerSettingsModal() {
  keyInput.value = apiKey;
  modelSelect.value = selectedModel;
  settingsModal.classList.add('open');
}

// ----------------------------------------------------
// Event Handlers Setup
// ----------------------------------------------------

// 1. Template Switcher
templateSelect.value = currentTemplate;
templateSelect.addEventListener('change', (e) => {
  currentTemplate = e.target.value;
  localStorage.setItem('resume_template', currentTemplate);
  preview.setTemplate(currentTemplate);
  preview.update(appState);
});

// 2. Theme Toggle
applyTheme(appTheme);
themeToggleBtn.addEventListener('click', () => {
  appTheme = appTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', appTheme);
  applyTheme(appTheme);
});

// 3. PDF Download Button
exportPdfBtn.addEventListener('click', async () => {
  exportPdfBtn.disabled = true;
  const originalText = exportPdfBtn.innerHTML;
  exportPdfBtn.innerHTML = `<span class="spinner"></span> Generating PDF...`;

  try {
    const filename = `${appState.personal.name ? appState.personal.name.toLowerCase().replace(/\s+/g, '_') : 'resume'}_cv.pdf`;
    await exportToPDF(resumeSheetTarget, filename);
  } catch (err) {
    alert(`Could not export PDF: ${err.message}`);
  } finally {
    exportPdfBtn.disabled = false;
    exportPdfBtn.innerHTML = originalText;
  }
});

// 4. Zoom Slider
scaleSlider.addEventListener('input', (e) => {
  applyZoom(parseInt(e.target.value, 10));
});

// 5. Open settings modal
settingsOpenBtn.addEventListener('click', triggerSettingsModal);

// 6. Close modal handlers
const closeModal = () => settingsModal.classList.remove('open');
settingsCloseBtn.addEventListener('click', closeModal);
settingsCancelBtn.addEventListener('click', closeModal);

// 7. Save settings handler
settingsSaveBtn.addEventListener('click', () => {
  apiKey = keyInput.value.trim();
  selectedModel = modelSelect.value;
  
  localStorage.setItem('openrouter_api_key', apiKey);
  localStorage.setItem('openrouter_model', selectedModel);
  
  closeModal();
  
  // Quick notification
  alert('Settings saved successfully!');
});

// ----------------------------------------------------
// Initialization
// ----------------------------------------------------
// Initial rendering of preview pane and SVG icons
preview.update(appState);
applyZoom(85);
createIcons();
