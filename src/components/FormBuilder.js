/**
 * FormBuilder Component
 * Manages form editing inputs, collapsible sections, list operations, and AI triggers.
 */

// Simple Lucide-inspired SVG icon strings
const userIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const fileTextIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`;
const briefcaseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H9a2 2 0 0 0-2 2v2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V4a2 2 0 0 0-2-2zM9 4h6v2H9V4z"/><path d="M12 12h.01"/></svg>`;
const folderIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`;
const gradIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`;
const awardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;
const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`;
const sparkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>`;
const chevronIcon = `<svg class="section-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

export class FormBuilder {
  constructor(container, initialState, onUpdate, onAIEnhance, onAISummary) {
    this.container = container;
    this.state = initialState;
    this.onUpdate = onUpdate;
    this.onAIEnhance = onAIEnhance;
    this.onAISummary = onAISummary;
    
    this.collapsedStates = {
      personal: false,
      summary: false,
      experience: false,
      projects: false,
      education: false,
      skills: false
    };

    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  updateState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    const s = this.state;

    this.container.innerHTML = `
      <!-- 1. PERSONAL DETAILS -->
      <div class="section-card ${this.collapsedStates.personal ? 'collapsed' : 'active'}" data-section="personal">
        <div class="section-header">
          <span class="section-title">${userIcon} Personal Details</span>
          ${chevronIcon}
        </div>
        <div class="section-body">
          <div class="form-row">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" data-field="personal.name" value="${s.personal.name || ''}" placeholder="e.g. Kushal At">
            </div>
            <div class="form-group">
              <label>Target Title</label>
              <input type="text" data-field="personal.title" value="${s.personal.title || ''}" placeholder="e.g. Senior Software Engineer">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Email</label>
              <input type="email" data-field="personal.email" value="${s.personal.email || ''}" placeholder="e.g. kushal@example.com">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" data-field="personal.phone" value="${s.personal.phone || ''}" placeholder="e.g. +1 (555) 000-0000">
            </div>
          </div>
          <div class="form-group">
            <label>Portfolio Website</label>
            <input type="url" data-field="personal.website" value="${s.personal.website || ''}" placeholder="e.g. https://kushal.dev">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>LinkedIn URL</label>
              <input type="url" data-field="personal.linkedin" value="${s.personal.linkedin || ''}" placeholder="e.g. linkedin.com/in/kushal">
            </div>
            <div class="form-group">
              <label>GitHub URL</label>
              <input type="url" data-field="personal.github" value="${s.personal.github || ''}" placeholder="e.g. github.com/kushal-at">
            </div>
          </div>
        </div>
      </div>

      <!-- 2. PROFESSIONAL SUMMARY -->
      <div class="section-card ${this.collapsedStates.summary ? 'collapsed' : 'active'}" data-section="summary">
        <div class="section-header">
          <span class="section-title">${fileTextIcon} Profile Summary</span>
          ${chevronIcon}
        </div>
        <div class="section-body">
          <div class="form-group">
            <label>Professional Summary</label>
            <textarea id="profile-summary-textarea" data-field="personal.summary" placeholder="Write a short summary or click AI Generate...">${s.personal.summary || ''}</textarea>
          </div>
          <div class="ai-action-bar">
            <button type="button" class="btn btn-ai btn-generate-summary">
              ${sparkIcon} Generate with AI
            </button>
          </div>
        </div>
      </div>

      <!-- 3. WORK EXPERIENCE -->
      <div class="section-card ${this.collapsedStates.experience ? 'collapsed' : 'active'}" data-section="experience">
        <div class="section-header">
          <span class="section-title">${briefcaseIcon} Work Experience</span>
          ${chevronIcon}
        </div>
        <div class="section-body">
          <div class="list-container" id="experience-list">
            ${s.experience.map((exp, idx) => `
              <div class="list-item-card" data-index="${idx}" data-list="experience">
                <div class="list-item-header">
                  <span class="list-item-title">Experience #${idx + 1}</span>
                  <button type="button" class="list-item-remove" data-action="remove-experience" data-index="${idx}">${trashIcon}</button>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Company</label>
                    <input type="text" data-field="experience.${idx}.company" value="${exp.company || ''}" placeholder="e.g. Google">
                  </div>
                  <div class="form-group">
                    <label>Role</label>
                    <input type="text" data-field="experience.${idx}.role" value="${exp.role || ''}" placeholder="e.g. Systems Developer">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Start Date</label>
                    <input type="text" data-field="experience.${idx}.startDate" value="${exp.startDate || ''}" placeholder="e.g. Jan 2022">
                  </div>
                  <div class="form-group">
                    <label>End Date</label>
                    <input type="text" data-field="experience.${idx}.endDate" value="${exp.endDate || ''}" placeholder="e.g. Present / Dec 2023">
                  </div>
                </div>
                <div class="form-group">
                  <label>Description / Bullet Points</label>
                  <textarea class="exp-desc-textarea" data-field="experience.${idx}.description" placeholder="Use separate lines for each bullet point...">${exp.description || ''}</textarea>
                </div>
                <div class="ai-action-bar">
                  <button type="button" class="btn btn-ai btn-enhance-experience" data-index="${idx}">
                    ${sparkIcon} Optimize with AI
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
          <button type="button" class="btn btn-secondary" id="btn-add-experience" style="margin-top: 0.5rem; justify-content: center;">
            ${plusIcon} Add Experience
          </button>
        </div>
      </div>

      <!-- 4. PROJECTS -->
      <div class="section-card ${this.collapsedStates.projects ? 'collapsed' : 'active'}" data-section="projects">
        <div class="section-header">
          <span class="section-title">${folderIcon} Projects</span>
          ${chevronIcon}
        </div>
        <div class="section-body">
          <div class="list-container" id="projects-list">
            ${s.projects.map((proj, idx) => `
              <div class="list-item-card" data-index="${idx}" data-list="projects">
                <div class="list-item-header">
                  <span class="list-item-title">Project #${idx + 1}</span>
                  <button type="button" class="list-item-remove" data-action="remove-project" data-index="${idx}">${trashIcon}</button>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" data-field="projects.${idx}.name" value="${proj.name || ''}" placeholder="e.g. Cloud Portfolio">
                  </div>
                  <div class="form-group">
                    <label>Project Link</label>
                    <input type="url" data-field="projects.${idx}.link" value="${proj.link || ''}" placeholder="e.g. github.com/user/project">
                  </div>
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea class="proj-desc-textarea" data-field="projects.${idx}.description" placeholder="Details about what you built...">${proj.description || ''}</textarea>
                </div>
                <div class="ai-action-bar">
                  <button type="button" class="btn btn-ai btn-enhance-project" data-index="${idx}">
                    ${sparkIcon} Optimize with AI
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
          <button type="button" class="btn btn-secondary" id="btn-add-project" style="margin-top: 0.5rem; justify-content: center;">
            ${plusIcon} Add Project
          </button>
        </div>
      </div>

      <!-- 5. EDUCATION -->
      <div class="section-card ${this.collapsedStates.education ? 'collapsed' : 'active'}" data-section="education">
        <div class="section-header">
          <span class="section-title">${gradIcon} Education</span>
          ${chevronIcon}
        </div>
        <div class="section-body">
          <div class="list-container" id="education-list">
            ${s.education.map((edu, idx) => `
              <div class="list-item-card" data-index="${idx}" data-list="education">
                <div class="list-item-header">
                  <span class="list-item-title">Education #${idx + 1}</span>
                  <button type="button" class="list-item-remove" data-action="remove-education" data-index="${idx}">${trashIcon}</button>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Institution</label>
                    <input type="text" data-field="education.${idx}.institution" value="${edu.institution || ''}" placeholder="e.g. Stanford University">
                  </div>
                  <div class="form-group">
                    <label>Degree / Major</label>
                    <input type="text" data-field="education.${idx}.degree" value="${edu.degree || ''}" placeholder="e.g. M.S. in Computer Science">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Start Date</label>
                    <input type="text" data-field="education.${idx}.startDate" value="${edu.startDate || ''}" placeholder="e.g. Sep 2020">
                  </div>
                  <div class="form-group">
                    <label>End Date</label>
                    <input type="text" data-field="education.${idx}.endDate" value="${edu.endDate || ''}" placeholder="e.g. Jun 2022">
                  </div>
                </div>
                <div class="form-group">
                  <label>Details / GPA / Honors</label>
                  <input type="text" data-field="education.${idx}.details" value="${edu.details || ''}" placeholder="e.g. GPA 3.9, Specialization in AI">
                </div>
              </div>
            `).join('')}
          </div>
          <button type="button" class="btn btn-secondary" id="btn-add-education" style="margin-top: 0.5rem; justify-content: center;">
            ${plusIcon} Add Education
          </button>
        </div>
      </div>

      <!-- 6. SKILLS -->
      <div class="section-card ${this.collapsedStates.skills ? 'collapsed' : 'active'}" data-section="skills">
        <div class="section-header">
          <span class="section-title">${awardIcon} Skills</span>
          ${chevronIcon}
        </div>
        <div class="section-body">
          <div class="form-group">
            <label>Core Skills (Press Enter to add tags)</label>
            <div class="tags-input-container">
              ${s.skills.map((skill, idx) => `
                <span class="tag-badge" data-index="${idx}">
                  ${skill}
                  <button type="button" class="tag-remove" data-action="remove-skill" data-index="${idx}">×</button>
                </span>
              `).join('')}
              <input type="text" class="tags-input-field" placeholder="Add skill..." id="skill-tag-input">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // 1. Accordion Toggles
    this.container.addEventListener('click', (e) => {
      const header = e.target.closest('.section-header');
      if (header) {
        const card = header.parentElement;
        const section = card.getAttribute('data-section');
        this.collapsedStates[section] = !this.collapsedStates[section];
        card.classList.toggle('collapsed', this.collapsedStates[section]);
        card.classList.toggle('active', !this.collapsedStates[section]);
      }
    });

    // 2. Dynamic Input Updates (Event Delegation)
    this.container.addEventListener('input', (e) => {
      const field = e.target.getAttribute('data-field');
      if (field) {
        this.setNestedValue(this.state, field, e.target.value);
        this.onUpdate(this.state);
      }
    });

    // 3. Add Experience
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('#btn-add-experience')) {
        this.state.experience.push({
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: ''
        });
        this.render();
        this.onUpdate(this.state);
      }
    });

    // 4. Remove Experience
    this.container.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-action="remove-experience"]');
      if (removeBtn) {
        const idx = parseInt(removeBtn.getAttribute('data-index'), 10);
        this.state.experience.splice(idx, 1);
        this.render();
        this.onUpdate(this.state);
      }
    });

    // 5. Add Project
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('#btn-add-project')) {
        this.state.projects.push({
          name: '',
          link: '',
          description: ''
        });
        this.render();
        this.onUpdate(this.state);
      }
    });

    // 6. Remove Project
    this.container.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-action="remove-project"]');
      if (removeBtn) {
        const idx = parseInt(removeBtn.getAttribute('data-index'), 10);
        this.state.projects.splice(idx, 1);
        this.render();
        this.onUpdate(this.state);
      }
    });

    // 7. Add Education
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('#btn-add-education')) {
        this.state.education.push({
          institution: '',
          degree: '',
          startDate: '',
          endDate: '',
          details: ''
        });
        this.render();
        this.onUpdate(this.state);
      }
    });

    // 8. Remove Education
    this.container.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-action="remove-education"]');
      if (removeBtn) {
        const idx = parseInt(removeBtn.getAttribute('data-index'), 10);
        this.state.education.splice(idx, 1);
        this.render();
        this.onUpdate(this.state);
      }
    });

    // 9. Add Skill (tags-input-field)
    this.container.addEventListener('keydown', (e) => {
      if (e.target.id === 'skill-tag-input' && e.key === 'Enter') {
        e.preventDefault();
        const value = e.target.value.trim();
        if (value && !this.state.skills.includes(value)) {
          this.state.skills.push(value);
          e.target.value = '';
          this.render();
          this.onUpdate(this.state);
          // Focus back onto input field
          const input = this.container.querySelector('#skill-tag-input');
          if (input) input.focus();
        }
      }
    });

    // 10. Remove Skill tag
    this.container.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-action="remove-skill"]');
      if (removeBtn) {
        const idx = parseInt(removeBtn.getAttribute('data-index'), 10);
        this.state.skills.splice(idx, 1);
        this.render();
        this.onUpdate(this.state);
      }
    });

    // 11. AI Optimize Experience
    this.container.addEventListener('click', async (e) => {
      const aiBtn = e.target.closest('.btn-enhance-experience');
      if (aiBtn) {
        const idx = parseInt(aiBtn.getAttribute('data-index'), 10);
        const originalText = this.state.experience[idx].description;
        const jobTitle = this.state.experience[idx].role || this.state.personal.title;
        
        if (!originalText.trim()) {
          alert('Please enter a description first so the AI can optimize it!');
          return;
        }

        aiBtn.disabled = true;
        const originalHtml = aiBtn.innerHTML;
        aiBtn.innerHTML = `<span class="spinner"></span> Optimizing...`;

        try {
          const enhanced = await this.onAIEnhance(originalText, jobTitle);
          if (enhanced) {
            this.state.experience[idx].description = enhanced;
            this.render();
            this.onUpdate(this.state);
          }
        } catch (err) {
          alert(`AI Enhancement failed: ${err.message}`);
        } finally {
          aiBtn.disabled = false;
          aiBtn.innerHTML = originalHtml;
        }
      }
    });

    // 12. AI Optimize Project
    this.container.addEventListener('click', async (e) => {
      const aiBtn = e.target.closest('.btn-enhance-project');
      if (aiBtn) {
        const idx = parseInt(aiBtn.getAttribute('data-index'), 10);
        const originalText = this.state.projects[idx].description;
        const projectName = this.state.projects[idx].name;
        
        if (!originalText.trim()) {
          alert('Please enter a project description first so the AI can optimize it!');
          return;
        }

        aiBtn.disabled = true;
        const originalHtml = aiBtn.innerHTML;
        aiBtn.innerHTML = `<span class="spinner"></span> Optimizing...`;

        try {
          const enhanced = await this.onAIEnhance(originalText, `Project: ${projectName}`);
          if (enhanced) {
            this.state.projects[idx].description = enhanced;
            this.render();
            this.onUpdate(this.state);
          }
        } catch (err) {
          alert(`AI Enhancement failed: ${err.message}`);
        } finally {
          aiBtn.disabled = false;
          aiBtn.innerHTML = originalHtml;
        }
      }
    });

    // 13. AI Generate Summary
    this.container.addEventListener('click', async (e) => {
      const summaryBtn = e.target.closest('.btn-generate-summary');
      if (summaryBtn) {
        if (this.state.skills.length === 0) {
          alert('Please add a few Skills first so the AI can write a targeted summary!');
          return;
        }

        summaryBtn.disabled = true;
        const originalHtml = summaryBtn.innerHTML;
        summaryBtn.innerHTML = `<span class="spinner"></span> Generating...`;

        try {
          const roles = [this.state.personal.title].filter(r => r);
          const generated = await this.onAISummary(this.state.skills, roles);
          if (generated) {
            this.state.personal.summary = generated;
            this.render();
            this.onUpdate(this.state);
          }
        } catch (err) {
          alert(`AI Summary Generation failed: ${err.message}`);
        } finally {
          summaryBtn.disabled = false;
          summaryBtn.innerHTML = originalHtml;
        }
      }
    });
  }

  /**
   * Helper to set nested state property, e.g. "personal.name" or "experience.0.company"
   */
  setNestedValue(obj, path, value) {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      // Check if it's an array index
      const index = parseInt(part, 10);
      current = isNaN(index) ? current[part] : current[index];
    }
    const finalKey = parts[parts.length - 1];
    const finalIndex = parseInt(finalKey, 10);
    
    if (isNaN(finalIndex)) {
      current[finalKey] = value;
    } else {
      current[finalIndex] = value;
    }
  }
}
