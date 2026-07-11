/**
 * FormBuilder Component v2
 * Dual-tab editor: Manual (accordion sections) + AI Generate (simplified form)
 */

const userIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const fileTextIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`;
const briefcaseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H9a2 2 0 0 0-2 2v2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V4a2 2 0 0 0-2-2zM9 4h6v2H9V4z"/></svg>`;
const folderIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`;
const gradIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`;
const awardIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`;
const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
const sparkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>`;
const chevronIcon = `<svg class="section-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
const penIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.855z"/></svg>`;
const wandIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2 19 5"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/></svg>`;

export class FormBuilder {
  constructor(container, initialState, onUpdate, onAIEnhance, onAISummary, onAIFullGenerate) {
    this.container = container;
    this.state = initialState;
    this.onUpdate = onUpdate;
    this.onAIEnhance = onAIEnhance;
    this.onAISummary = onAISummary;
    this.onAIFullGenerate = onAIFullGenerate;

    this.activeTab = 'manual';
    this.collapsedStates = {
      personal: false,
      summary: true,
      experience: true,
      projects: true,
      education: true,
      skills: true
    };

    this.aiInputs = { name: '', phone: '', education: '', projects: '', expertise: '' };
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const s = this.state;
    const ai = this.aiInputs;

    this.container.innerHTML = `
      <!-- TAB SWITCHER -->
      <div class="tab-switcher">
        <button class="tab-btn ${this.activeTab === 'manual' ? 'active' : ''}" data-tab="manual">${penIcon} Manual</button>
        <button class="tab-btn ${this.activeTab === 'ai' ? 'active' : ''}" data-tab="ai">${wandIcon} AI Generate</button>
      </div>

      <!-- MANUAL TAB -->
      <div class="tab-content ${this.activeTab === 'manual' ? 'active' : ''}" id="tab-manual">
        ${this._renderPersonal(s)}
        ${this._renderSummary(s)}
        ${this._renderExperience(s)}
        ${this._renderProjects(s)}
        ${this._renderEducation(s)}
        ${this._renderSkills(s)}
      </div>

      <!-- AI GENERATE TAB -->
      <div class="tab-content ${this.activeTab === 'ai' ? 'active' : ''}" id="tab-ai">
        <div class="ai-gen-card">
          <div class="ai-gen-header">${sparkIcon} AI Resume Generator</div>
          <div class="ai-gen-desc">Provide your basic info and let AI craft your entire resume. The more detail you provide in the expertise box, the better the result.</div>
          <div class="ai-gen-divider"></div>
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="ai-name" value="${ai.name}" placeholder="e.g. John Doe">
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" id="ai-phone" value="${ai.phone}" placeholder="e.g. +1 (555) 000-0000">
          </div>
          <div class="form-group">
            <label>Education</label>
            <textarea id="ai-education" placeholder="e.g. B.S. Computer Science from MIT (2018-2022)&#10;M.S. Data Science from Stanford (2022-2024)">${ai.education}</textarea>
          </div>
          <div class="form-group">
            <label>Projects</label>
            <textarea id="ai-projects" placeholder="e.g. Built a cloud-based e-commerce platform using React and AWS&#10;Created an ML model for sentiment analysis with 94% accuracy">${ai.projects}</textarea>
          </div>
          <div class="form-group">
            <label>Expertise, Skills & Resume Motive</label>
            <textarea id="ai-expertise" style="min-height: 120px;" placeholder="Describe your expertise, technical skills, years of experience, and what role this resume is targeting.&#10;&#10;Example: I have 5 years of experience in full-stack development with React, Node.js, and PostgreSQL. I'm targeting senior engineer roles at FAANG companies...">${ai.expertise}</textarea>
          </div>
          <button type="button" class="btn btn-generate-full" id="btn-ai-generate">
            ${sparkIcon} Generate Full Resume with AI
          </button>
        </div>
      </div>
    `;
  }

  _renderPersonal(s) {
    return `
      <div class="section-card ${this.collapsedStates.personal ? 'collapsed' : 'active'}" data-section="personal">
        <div class="section-header">
          <span class="section-title">${userIcon} Personal Details</span>
          ${chevronIcon}
        </div>
        <div class="section-body">
          <div class="form-row">
            <div class="form-group"><label>Full Name</label><input type="text" data-field="personal.name" value="${s.personal.name || ''}" placeholder="e.g. John Doe"></div>
            <div class="form-group"><label>Target Title</label><input type="text" data-field="personal.title" value="${s.personal.title || ''}" placeholder="e.g. Senior Software Engineer"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Email</label><input type="email" data-field="personal.email" value="${s.personal.email || ''}" placeholder="e.g. john@example.com"></div>
            <div class="form-group"><label>Phone</label><input type="tel" data-field="personal.phone" value="${s.personal.phone || ''}" placeholder="e.g. +1 (555) 000-0000"></div>
          </div>
          <div class="form-group"><label>Portfolio Website</label><input type="url" data-field="personal.website" value="${s.personal.website || ''}" placeholder="e.g. https://johndoe.dev"></div>
          <div class="form-row">
            <div class="form-group"><label>LinkedIn</label><input type="url" data-field="personal.linkedin" value="${s.personal.linkedin || ''}" placeholder="e.g. linkedin.com/in/johndoe"></div>
            <div class="form-group"><label>GitHub</label><input type="url" data-field="personal.github" value="${s.personal.github || ''}" placeholder="e.g. github.com/johndoe"></div>
          </div>
        </div>
      </div>`;
  }

  _renderSummary(s) {
    return `
      <div class="section-card ${this.collapsedStates.summary ? 'collapsed' : 'active'}" data-section="summary">
        <div class="section-header"><span class="section-title">${fileTextIcon} Profile Summary</span>${chevronIcon}</div>
        <div class="section-body">
          <div class="form-group"><label>Professional Summary</label><textarea data-field="personal.summary" placeholder="Write a short summary or click AI Generate...">${s.personal.summary || ''}</textarea></div>
          <div class="ai-action-bar"><button type="button" class="btn btn-ai btn-generate-summary">${sparkIcon} Generate with AI</button></div>
        </div>
      </div>`;
  }

  _renderExperience(s) {
    return `
      <div class="section-card ${this.collapsedStates.experience ? 'collapsed' : 'active'}" data-section="experience">
        <div class="section-header"><span class="section-title">${briefcaseIcon} Work Experience</span>${chevronIcon}</div>
        <div class="section-body">
          <div class="list-container">
            ${s.experience.map((exp, i) => `
              <div class="list-item-card">
                <div class="list-item-header"><span class="list-item-title">Experience #${i+1}</span><button type="button" class="list-item-remove" data-action="remove-experience" data-index="${i}">${trashIcon}</button></div>
                <div class="form-row">
                  <div class="form-group"><label>Company</label><input type="text" data-field="experience.${i}.company" value="${exp.company||''}" placeholder="e.g. Google"></div>
                  <div class="form-group"><label>Role</label><input type="text" data-field="experience.${i}.role" value="${exp.role||''}" placeholder="e.g. Software Engineer"></div>
                </div>
                <div class="form-row">
                  <div class="form-group"><label>Start Date</label><input type="text" data-field="experience.${i}.startDate" value="${exp.startDate||''}" placeholder="e.g. Jan 2022"></div>
                  <div class="form-group"><label>End Date</label><input type="text" data-field="experience.${i}.endDate" value="${exp.endDate||''}" placeholder="e.g. Present"></div>
                </div>
                <div class="form-group"><label>Description</label><textarea data-field="experience.${i}.description" placeholder="Bullet points, one per line...">${exp.description||''}</textarea></div>
                <div class="ai-action-bar"><button type="button" class="btn btn-ai btn-enhance-experience" data-index="${i}">${sparkIcon} Optimize with AI</button></div>
              </div>
            `).join('')}
          </div>
          <button type="button" class="btn btn-secondary" id="btn-add-experience" style="justify-content:center;">${plusIcon} Add Experience</button>
        </div>
      </div>`;
  }

  _renderProjects(s) {
    return `
      <div class="section-card ${this.collapsedStates.projects ? 'collapsed' : 'active'}" data-section="projects">
        <div class="section-header"><span class="section-title">${folderIcon} Projects</span>${chevronIcon}</div>
        <div class="section-body">
          <div class="list-container">
            ${s.projects.map((p, i) => `
              <div class="list-item-card">
                <div class="list-item-header"><span class="list-item-title">Project #${i+1}</span><button type="button" class="list-item-remove" data-action="remove-project" data-index="${i}">${trashIcon}</button></div>
                <div class="form-row">
                  <div class="form-group"><label>Name</label><input type="text" data-field="projects.${i}.name" value="${p.name||''}" placeholder="e.g. Portfolio App"></div>
                  <div class="form-group"><label>Link</label><input type="url" data-field="projects.${i}.link" value="${p.link||''}" placeholder="e.g. github.com/..."></div>
                </div>
                <div class="form-group"><label>Description</label><textarea data-field="projects.${i}.description" placeholder="What you built...">${p.description||''}</textarea></div>
                <div class="ai-action-bar"><button type="button" class="btn btn-ai btn-enhance-project" data-index="${i}">${sparkIcon} Optimize with AI</button></div>
              </div>
            `).join('')}
          </div>
          <button type="button" class="btn btn-secondary" id="btn-add-project" style="justify-content:center;">${plusIcon} Add Project</button>
        </div>
      </div>`;
  }

  _renderEducation(s) {
    return `
      <div class="section-card ${this.collapsedStates.education ? 'collapsed' : 'active'}" data-section="education">
        <div class="section-header"><span class="section-title">${gradIcon} Education</span>${chevronIcon}</div>
        <div class="section-body">
          <div class="list-container">
            ${s.education.map((e, i) => `
              <div class="list-item-card">
                <div class="list-item-header"><span class="list-item-title">Education #${i+1}</span><button type="button" class="list-item-remove" data-action="remove-education" data-index="${i}">${trashIcon}</button></div>
                <div class="form-row">
                  <div class="form-group"><label>Institution</label><input type="text" data-field="education.${i}.institution" value="${e.institution||''}" placeholder="e.g. MIT"></div>
                  <div class="form-group"><label>Degree</label><input type="text" data-field="education.${i}.degree" value="${e.degree||''}" placeholder="e.g. B.S. Computer Science"></div>
                </div>
                <div class="form-row">
                  <div class="form-group"><label>Start</label><input type="text" data-field="education.${i}.startDate" value="${e.startDate||''}" placeholder="2018"></div>
                  <div class="form-group"><label>End</label><input type="text" data-field="education.${i}.endDate" value="${e.endDate||''}" placeholder="2022"></div>
                </div>
                <div class="form-group"><label>Details</label><input type="text" data-field="education.${i}.details" value="${e.details||''}" placeholder="e.g. GPA 3.9, Dean's List"></div>
              </div>
            `).join('')}
          </div>
          <button type="button" class="btn btn-secondary" id="btn-add-education" style="justify-content:center;">${plusIcon} Add Education</button>
        </div>
      </div>`;
  }

  _renderSkills(s) {
    return `
      <div class="section-card ${this.collapsedStates.skills ? 'collapsed' : 'active'}" data-section="skills">
        <div class="section-header"><span class="section-title">${awardIcon} Skills</span>${chevronIcon}</div>
        <div class="section-body">
          <div class="form-group">
            <label>Core Skills (Press Enter to add)</label>
            <div class="tags-input-container">
              ${s.skills.map((sk, i) => `<span class="tag-badge">${sk}<button type="button" class="tag-remove" data-action="remove-skill" data-index="${i}">×</button></span>`).join('')}
              <input type="text" class="tags-input-field" placeholder="Type a skill..." id="skill-tag-input">
            </div>
          </div>
        </div>
      </div>`;
  }

  setupEventListeners() {
    const c = this.container;

    // Tab switching
    c.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('.tab-btn');
      if (tabBtn) {
        this.activeTab = tabBtn.getAttribute('data-tab');
        this.render();
      }
    });

    // Accordion toggles
    c.addEventListener('click', (e) => {
      const header = e.target.closest('.section-header');
      if (header) {
        const card = header.parentElement;
        const section = card.getAttribute('data-section');
        if (section) {
          this.collapsedStates[section] = !this.collapsedStates[section];
          card.classList.toggle('collapsed', this.collapsedStates[section]);
          card.classList.toggle('active', !this.collapsedStates[section]);
        }
      }
    });

    // Input updates
    c.addEventListener('input', (e) => {
      const field = e.target.getAttribute('data-field');
      if (field) {
        this._setNested(this.state, field, e.target.value);
        this.onUpdate(this.state);
      }
      // AI tab inputs
      if (e.target.id === 'ai-name') this.aiInputs.name = e.target.value;
      if (e.target.id === 'ai-phone') this.aiInputs.phone = e.target.value;
      if (e.target.id === 'ai-education') this.aiInputs.education = e.target.value;
      if (e.target.id === 'ai-projects') this.aiInputs.projects = e.target.value;
      if (e.target.id === 'ai-expertise') this.aiInputs.expertise = e.target.value;
    });

    // Add Experience
    c.addEventListener('click', (e) => {
      if (e.target.closest('#btn-add-experience')) { this.state.experience.push({ company:'', role:'', startDate:'', endDate:'', description:'' }); this.render(); this.onUpdate(this.state); }
    });
    // Remove Experience
    c.addEventListener('click', (e) => {
      const b = e.target.closest('[data-action="remove-experience"]'); if (b) { this.state.experience.splice(+b.dataset.index,1); this.render(); this.onUpdate(this.state); }
    });
    // Add Project
    c.addEventListener('click', (e) => {
      if (e.target.closest('#btn-add-project')) { this.state.projects.push({ name:'', link:'', description:'' }); this.render(); this.onUpdate(this.state); }
    });
    // Remove Project
    c.addEventListener('click', (e) => {
      const b = e.target.closest('[data-action="remove-project"]'); if (b) { this.state.projects.splice(+b.dataset.index,1); this.render(); this.onUpdate(this.state); }
    });
    // Add Education
    c.addEventListener('click', (e) => {
      if (e.target.closest('#btn-add-education')) { this.state.education.push({ institution:'', degree:'', startDate:'', endDate:'', details:'' }); this.render(); this.onUpdate(this.state); }
    });
    // Remove Education
    c.addEventListener('click', (e) => {
      const b = e.target.closest('[data-action="remove-education"]'); if (b) { this.state.education.splice(+b.dataset.index,1); this.render(); this.onUpdate(this.state); }
    });
    // Add Skill
    c.addEventListener('keydown', (e) => {
      if (e.target.id === 'skill-tag-input' && e.key === 'Enter') {
        e.preventDefault();
        const v = e.target.value.trim();
        if (v && !this.state.skills.includes(v)) { this.state.skills.push(v); e.target.value=''; this.render(); this.onUpdate(this.state); const inp = c.querySelector('#skill-tag-input'); if(inp) inp.focus(); }
      }
    });
    // Remove Skill
    c.addEventListener('click', (e) => {
      const b = e.target.closest('[data-action="remove-skill"]'); if (b) { this.state.skills.splice(+b.dataset.index,1); this.render(); this.onUpdate(this.state); }
    });

    // AI Enhance Experience
    c.addEventListener('click', async (e) => {
      const btn = e.target.closest('.btn-enhance-experience');
      if (btn) {
        const i = +btn.dataset.index, txt = this.state.experience[i].description, role = this.state.experience[i].role || this.state.personal.title;
        if (!txt.trim()) { alert('Enter a description first!'); return; }
        btn.disabled = true; const orig = btn.innerHTML; btn.innerHTML = `<span class="spinner"></span> Optimizing...`;
        try { const r = await this.onAIEnhance(txt, role); if(r) { this.state.experience[i].description = r; this.render(); this.onUpdate(this.state); } }
        catch(err) { alert(`AI failed: ${err.message}`); } finally { btn.disabled = false; btn.innerHTML = orig; }
      }
    });

    // AI Enhance Project
    c.addEventListener('click', async (e) => {
      const btn = e.target.closest('.btn-enhance-project');
      if (btn) {
        const i = +btn.dataset.index, txt = this.state.projects[i].description, name = this.state.projects[i].name;
        if (!txt.trim()) { alert('Enter a description first!'); return; }
        btn.disabled = true; const orig = btn.innerHTML; btn.innerHTML = `<span class="spinner"></span> Optimizing...`;
        try { const r = await this.onAIEnhance(txt, `Project: ${name}`); if(r) { this.state.projects[i].description = r; this.render(); this.onUpdate(this.state); } }
        catch(err) { alert(`AI failed: ${err.message}`); } finally { btn.disabled = false; btn.innerHTML = orig; }
      }
    });

    // AI Generate Summary
    c.addEventListener('click', async (e) => {
      const btn = e.target.closest('.btn-generate-summary');
      if (btn) {
        if (!this.state.skills.length) { alert('Add some skills first!'); return; }
        btn.disabled = true; const orig = btn.innerHTML; btn.innerHTML = `<span class="spinner"></span> Generating...`;
        try { const r = await this.onAISummary(this.state.skills, [this.state.personal.title].filter(Boolean)); if(r) { this.state.personal.summary = r; this.render(); this.onUpdate(this.state); } }
        catch(err) { alert(`AI failed: ${err.message}`); } finally { btn.disabled = false; btn.innerHTML = orig; }
      }
    });

    // AI Full Resume Generate
    c.addEventListener('click', async (e) => {
      const btn = e.target.closest('#btn-ai-generate');
      if (btn) {
        const { name, phone, education, projects, expertise } = this.aiInputs;
        if (!expertise.trim()) { alert('Please describe your expertise and skills so the AI can generate your resume!'); return; }
        btn.disabled = true; const orig = btn.innerHTML; btn.innerHTML = `<span class="spinner"></span> Generating your resume...`;
        try {
          const result = await this.onAIFullGenerate({ name, phone, education, projects, expertise });
          if (result) {
            // Merge AI result into state
            Object.assign(this.state, result);
            this.activeTab = 'manual';
            this.collapsedStates = { personal: false, summary: false, experience: false, projects: false, education: false, skills: false };
            this.render();
            this.onUpdate(this.state);
          }
        } catch(err) { alert(`AI Generation failed: ${err.message}`); }
        finally { btn.disabled = false; btn.innerHTML = orig; }
      }
    });
  }

  _setNested(obj, path, value) {
    const parts = path.split('.');
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const idx = parseInt(parts[i], 10);
      cur = isNaN(idx) ? cur[parts[i]] : cur[idx];
    }
    const last = parts[parts.length - 1];
    const li = parseInt(last, 10);
    isNaN(li) ? cur[last] = value : cur[li] = value;
  }
}
