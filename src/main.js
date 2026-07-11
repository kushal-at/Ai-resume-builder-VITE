import './style.css';
import { createIcons, icons } from 'lucide';
import { FormBuilder } from './components/FormBuilder.js';
import { ResumePreview } from './components/ResumePreview.js';
import { enhanceBulletPoint, generateSummary, generateFullResume } from './services/ai.js';
import { exportToPDF } from './utils/pdf.js';

// ----------------------------------------------------
// Default Demo Data (John Doe)
// ----------------------------------------------------
const defaultState = {
  personal: {
    name: 'John Doe',
    title: 'Full Stack Software Engineer',
    email: 'john.doe@gmail.com',
    phone: '+1 (555) 123-4567',
    website: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    summary: 'Results-driven Full Stack Engineer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud architectures. Passionate about clean code, performance optimization, and delivering impactful user experiences.'
  },
  experience: [
    {
      company: 'TechCorp Inc.',
      role: 'Senior Software Engineer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: 'Led development of a microservices architecture serving 2M+ daily active users, reducing latency by 35%.\nMentored a team of 4 junior developers through code reviews and pair programming sessions.\nDesigned and implemented CI/CD pipelines using GitHub Actions, cutting deployment time by 60%.'
    },
    {
      company: 'StartupXYZ',
      role: 'Software Developer',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      description: 'Built responsive front-end interfaces with React and TypeScript for an enterprise SaaS platform.\nOptimized database queries reducing average API response times from 200ms to 45ms.'
    }
  ],
  projects: [
    {
      name: 'TaskFlow — Project Manager',
      link: 'https://github.com/johndoe/taskflow',
      description: 'Developed a real-time project management tool with drag-and-drop kanban boards using React and WebSockets.\nImplemented role-based access control and team collaboration features serving 500+ active users.'
    }
  ],
  education: [
    {
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      startDate: '2015',
      endDate: '2019',
      details: 'Dean\'s List, GPA 3.8/4.0. Senior capstone project on distributed systems.'
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Git']
};

// ----------------------------------------------------
// State
// ----------------------------------------------------
let appState = JSON.parse(localStorage.getItem('ai_resume_builder_state')) || defaultState;
let apiKey = localStorage.getItem('openrouter_api_key') || import.meta.env.VITE_OPENROUTER_API_KEY || '';
let selectedModel = localStorage.getItem('openrouter_model') || 'meta-llama/llama-3-8b-instruct:free';
let currentTemplate = localStorage.getItem('resume_template') || 'modern';
let appTheme = localStorage.getItem('theme') || 'light';

// ----------------------------------------------------
// DOM
// ----------------------------------------------------
const editorContainer = document.getElementById('editor-container');
const resumeSheetTarget = document.getElementById('resume-sheet-target');
const templateSelect = document.getElementById('template-select');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const exportPdfBtn = document.getElementById('export-pdf-btn');
const scaleSlider = document.getElementById('preview-scale-slider');
const scaleValue = document.getElementById('preview-scale-value');
const resumeWrapper = document.getElementById('resume-wrapper');
const settingsModal = document.getElementById('settings-modal');
const settingsOpenBtn = document.getElementById('settings-open-btn');
const settingsCloseBtn = document.getElementById('settings-close-btn');
const settingsCancelBtn = document.getElementById('settings-cancel-btn');
const settingsSaveBtn = document.getElementById('settings-save-btn');
const keyInput = document.getElementById('openrouter-key-input');
const modelSelect = document.getElementById('openrouter-model-select');

// ----------------------------------------------------
// Components
// ----------------------------------------------------
const preview = new ResumePreview(resumeSheetTarget, currentTemplate);

const formBuilder = new FormBuilder(
  editorContainer,
  appState,
  // OnUpdate
  (newState) => {
    appState = newState;
    localStorage.setItem('ai_resume_builder_state', JSON.stringify(appState));
    preview.update(appState);
  },
  // OnAIEnhance
  async (text, jobTitle) => {
    if (!apiKey) { triggerSettingsModal(); throw new Error('API Key missing.'); }
    return enhanceBulletPoint(text, jobTitle, apiKey, selectedModel);
  },
  // OnAISummary
  async (skills, roles) => {
    if (!apiKey) { triggerSettingsModal(); throw new Error('API Key missing.'); }
    return generateSummary(skills, roles, apiKey, selectedModel);
  },
  // OnAIFullGenerate
  async (inputs) => {
    if (!apiKey) { triggerSettingsModal(); throw new Error('API Key missing. Configure your OpenRouter key in API Settings first.'); }
    return generateFullResume(inputs, apiKey, selectedModel);
  }
);

// ----------------------------------------------------
// Helpers
// ----------------------------------------------------
function applyZoom(val) {
  scaleSlider.value = val;
  scaleValue.textContent = `${val}%`;
  const s = val / 100;
  resumeWrapper.style.transform = `scale(${s})`;
  resumeWrapper.style.marginBottom = `-${297 * (1 - s)}mm`;
}

function autoFitScale() {
  const pane = document.querySelector('.preview-pane');
  if (!pane) return;
  const w = pane.clientWidth;
  const target = 834;
  applyZoom(w < target ? Math.max(40, Math.min(100, Math.floor((w / target) * 100))) : 80);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.innerHTML = `<svg data-lucide="sun" width="18" height="18"></svg>`;
  } else {
    document.body.classList.remove('dark-mode');
    themeToggleBtn.innerHTML = `<svg data-lucide="moon" width="18" height="18"></svg>`;
  }
  createIcons({ icons });
}

function triggerSettingsModal() {
  const localKey = localStorage.getItem('openrouter_api_key') || '';
  keyInput.value = localKey;
  keyInput.placeholder = (!localKey && import.meta.env.VITE_OPENROUTER_API_KEY) ? 'Using shared demo key' : 'sk-or-v1-...';
  modelSelect.value = selectedModel;
  settingsModal.classList.add('open');
}

// ----------------------------------------------------
// Events
// ----------------------------------------------------
templateSelect.value = currentTemplate;
templateSelect.addEventListener('change', (e) => {
  currentTemplate = e.target.value;
  localStorage.setItem('resume_template', currentTemplate);
  preview.setTemplate(currentTemplate);
  preview.update(appState);
});

applyTheme(appTheme);
themeToggleBtn.addEventListener('click', () => {
  appTheme = appTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', appTheme);
  applyTheme(appTheme);
});

exportPdfBtn.addEventListener('click', async () => {
  exportPdfBtn.disabled = true;
  const orig = exportPdfBtn.innerHTML;
  exportPdfBtn.innerHTML = `<span class="spinner"></span> Exporting...`;
  try {
    const fn = `${appState.personal.name ? appState.personal.name.toLowerCase().replace(/\s+/g, '_') : 'resume'}_cv.pdf`;
    await exportToPDF(resumeSheetTarget, fn);
  } catch (err) { alert(`PDF export failed: ${err.message}`); }
  finally { exportPdfBtn.disabled = false; exportPdfBtn.innerHTML = orig; }
});

scaleSlider.addEventListener('input', (e) => applyZoom(+e.target.value));

settingsOpenBtn.addEventListener('click', triggerSettingsModal);
const closeModal = () => settingsModal.classList.remove('open');
settingsCloseBtn.addEventListener('click', closeModal);
settingsCancelBtn.addEventListener('click', closeModal);

settingsSaveBtn.addEventListener('click', () => {
  const k = keyInput.value.trim();
  selectedModel = modelSelect.value;
  localStorage.setItem('openrouter_api_key', k);
  localStorage.setItem('openrouter_model', selectedModel);
  apiKey = k || import.meta.env.VITE_OPENROUTER_API_KEY || '';
  closeModal();
  alert('Settings saved!');
});

// ----------------------------------------------------
// Init
// ----------------------------------------------------
preview.update(appState);
autoFitScale();
createIcons({ icons });
window.addEventListener('resize', autoFitScale);
