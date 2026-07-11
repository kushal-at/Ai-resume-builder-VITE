/**
 * Professional Slate template (2-Column Sidebar)
 */

const mailIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const phoneIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
const globeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
const linkedinIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

export function renderProfessional(data) {
  const p = data.personal || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const skills = data.skills || [];

  // Contacts
  const contactItems = [];
  if (p.email) contactItems.push(`<div class="contact-item">${mailIcon} <span>${p.email}</span></div>`);
  if (p.phone) contactItems.push(`<div class="contact-item">${phoneIcon} <span>${p.phone}</span></div>`);
  if (p.website) contactItems.push(`<div class="contact-item">${globeIcon} <span><a href="${p.website}" target="_blank">${p.website.replace(/^https?:\/\//, '')}</a></span></div>`);
  if (p.linkedin) {
    const username = p.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '');
    contactItems.push(`<div class="contact-item">${linkedinIcon} <span><a href="${p.linkedin}" target="_blank">${username || 'LinkedIn'}</a></span></div>`);
  }
  if (p.github) {
    const username = p.github.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '');
    contactItems.push(`<div class="contact-item">${githubIcon} <span><a href="${p.github}" target="_blank">${username || 'GitHub'}</a></span></div>`);
  }

  return `
    <div class="template-professional">
      <div class="sidebar">
        <div>
          <h1 class="name">${p.name || 'Your Name'}</h1>
          <div class="title">${p.title || 'Professional Title'}</div>
        </div>

        ${contactItems.length > 0 ? `
          <div>
            <h3 class="sidebar-section-title">Contact</h3>
            <div class="contact-list">
              ${contactItems.join('')}
            </div>
          </div>
        ` : ''}

        ${skills.length > 0 ? `
          <div>
            <h3 class="sidebar-section-title">Skills</h3>
            <div class="sidebar-skills">
              ${skills.map(skill => `<div class="sidebar-skill-item">• ${skill}</div>`).join('')}
            </div>
          </div>
        ` : ''}

        ${education.length > 0 ? `
          <div>
            <h3 class="sidebar-section-title">Education</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              ${education.map(edu => `
                <div style="font-size: 8pt; line-height: 1.4;">
                  <div style="font-weight: 700; color: #ffffff;">${edu.degree || 'Degree'}</div>
                  <div style="color: #cbd5e1; font-weight: 500;">${edu.institution || 'Institution'}</div>
                  <div style="color: #94a3b8; font-size: 7.5pt;">${edu.startDate || ''} - ${edu.endDate || ''}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="main-content">
        ${p.summary ? `
          <div>
            <h2 class="section-title">Profile</h2>
            <div class="summary">${p.summary}</div>
          </div>
        ` : ''}

        ${experiences.length > 0 ? `
          <div>
            <h2 class="section-title">Experience</h2>
            ${experiences.map(exp => `
              <div class="experience-item">
                <div class="item-header">
                  <span class="item-title">${exp.company || 'Company'}</span>
                  <span class="item-date">${exp.startDate || ''} - ${exp.endDate || ''}</span>
                </div>
                <div class="item-subtitle" style="margin-bottom: 0.35rem;">${exp.role || 'Role'}</div>
                <div class="item-desc">
                  ${exp.description ? `<ul>${exp.description.split('\n').filter(bullet => bullet.trim()).map(bullet => `<li>${bullet.replace(/^-\s*/, '')}</li>`).join('')}</ul>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${projects.length > 0 ? `
          <div>
            <h2 class="section-title">Projects</h2>
            ${projects.map(proj => `
              <div class="project-item">
                <div class="item-header">
                  <span class="item-title">${proj.name || 'Project Name'}</span>
                  <span class="item-date">
                    ${proj.link ? `<a href="${proj.link}" target="_blank" style="color: #4f46e5; text-decoration: underline;">Project Link</a>` : ''}
                  </span>
                </div>
                <div class="item-desc">
                  ${proj.description ? `<ul>${proj.description.split('\n').filter(bullet => bullet.trim()).map(bullet => `<li>${bullet.replace(/^-\s*/, '')}</li>`).join('')}</ul>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
