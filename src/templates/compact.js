/**
 * Compact Dense template — maximum information density for experienced professionals.
 * Two-column CSS grid: left 60% (Experience, Projects), right 40% (Education, Skills, Contact).
 */

const mailIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const phoneIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
const globeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
const linkedinIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

export function renderCompact(data) {
  const p = data.personal || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const skills = data.skills || [];

  // Helper: render bullet points from a description string
  const renderBullets = (desc) => {
    if (!desc) return '';
    const items = desc.split('\n').filter(l => l.trim()).map(l => `<li>${l.replace(/^-\s*/, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  };

  // Build contact items — stacked vertically with small icons
  const contactEntries = [];
  if (p.email) contactEntries.push(`<div class="compact-contact-item">${mailIcon} <span>${p.email}</span></div>`);
  if (p.phone) contactEntries.push(`<div class="compact-contact-item">${phoneIcon} <span>${p.phone}</span></div>`);
  if (p.website) contactEntries.push(`<div class="compact-contact-item">${globeIcon} <a href="${p.website}" target="_blank">${p.website.replace(/^https?:\/\//, '')}</a></div>`);
  if (p.linkedin) contactEntries.push(`<div class="compact-contact-item">${linkedinIcon} <a href="${p.linkedin}" target="_blank">LinkedIn</a></div>`);
  if (p.github) contactEntries.push(`<div class="compact-contact-item">${githubIcon} <a href="${p.github}" target="_blank">GitHub</a></div>`);

  // ── Left column: Experience + Projects ──
  const leftColumn = `
    ${experiences.length > 0 ? `
      <div class="compact-section">
        <h2 class="compact-section-title">Experience</h2>
        ${experiences.map(exp => `
          <div class="compact-entry">
            <div class="compact-entry-header">
              <span class="compact-entry-title">${exp.company || 'Company'}</span>
              <span class="compact-entry-date">${exp.startDate || ''} – ${exp.endDate || ''}</span>
            </div>
            <div class="compact-entry-role">${exp.role || 'Role'}</div>
            <div class="compact-entry-desc">${renderBullets(exp.description)}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${projects.length > 0 ? `
      <div class="compact-section">
        <h2 class="compact-section-title">Projects</h2>
        ${projects.map(proj => `
          <div class="compact-entry">
            <div class="compact-entry-header">
              <span class="compact-entry-title">${proj.name || 'Project'}</span>
              ${proj.link ? `<span class="compact-entry-date"><a href="${proj.link}" target="_blank" style="color:#4f46e5;text-decoration:underline;">Link</a></span>` : ''}
            </div>
            <div class="compact-entry-desc">${renderBullets(proj.description)}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;

  // ── Right column: Contact + Education + Skills ──
  const rightColumn = `
    ${contactEntries.length > 0 ? `
      <div class="compact-section">
        <h2 class="compact-section-title">Contact</h2>
        <div class="compact-contact-list">
          ${contactEntries.join('')}
        </div>
      </div>
    ` : ''}

    ${education.length > 0 ? `
      <div class="compact-section">
        <h2 class="compact-section-title">Education</h2>
        ${education.map(edu => `
          <div class="compact-entry">
            <div class="compact-entry-header">
              <span class="compact-entry-title">${edu.institution || 'Institution'}</span>
            </div>
            <div class="compact-entry-role">${edu.degree || 'Degree'}</div>
            <div class="compact-entry-date" style="margin-bottom:1px;">${edu.startDate || ''} – ${edu.endDate || ''}</div>
            ${edu.details ? `<div class="compact-entry-desc">${edu.details}</div>` : ''}
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${skills.length > 0 ? `
      <div class="compact-section">
        <h2 class="compact-section-title">Skills</h2>
        <div class="compact-skills">
          ${skills.map(s => `<span class="compact-skill-tag">${s}</span>`).join('')}
        </div>
      </div>
    ` : ''}
  `;

  // ── Assemble ──
  return `
    <div class="template-compact">
      <style>
        .template-compact {
          font-family: 'Inter', sans-serif;
          font-size: 7pt;
          line-height: 1.4;
          color: #1f2937;
        }

        /* ── Header (full-width) ── */
        .compact-header {
          margin-bottom: 6px;
        }
        .compact-header .compact-name {
          font-family: 'Outfit', sans-serif;
          font-size: 20pt;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
          color: #111827;
        }
        .compact-header .compact-title {
          font-size: 10pt;
          color: #6b7280;
          margin: 0;
        }

        ${p.summary ? `
        .compact-summary {
          font-size: 7pt;
          color: #374151;
          margin: 4px 0 6px 0;
          line-height: 1.4;
        }` : ''}

        /* ── Two-column grid ── */
        .compact-grid {
          display: grid;
          grid-template-columns: 60% 40%;
          gap: 12px;
        }

        /* ── Sections ── */
        .compact-section {
          margin-bottom: 6px;
        }
        .compact-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 9pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 3px 0;
          padding-bottom: 2px;
          border-bottom: 0.5px solid #d1d5db;
          color: #111827;
        }

        /* ── Entry blocks ── */
        .compact-entry {
          margin-bottom: 4px;
        }
        .compact-entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .compact-entry-title {
          font-weight: 600;
          font-size: 7.5pt;
          color: #111827;
        }
        .compact-entry-date {
          font-size: 6.5pt;
          color: #6b7280;
          white-space: nowrap;
        }
        .compact-entry-role {
          font-size: 7pt;
          font-style: italic;
          color: #4b5563;
          margin-bottom: 1px;
        }
        .compact-entry-desc {
          font-size: 7pt;
          color: #374151;
        }
        .compact-entry-desc ul {
          margin: 1px 0 0 0;
          padding-left: 12px;
        }
        .compact-entry-desc li {
          margin-bottom: 0.5px;
        }

        /* ── Contact list (right column, stacked) ── */
        .compact-contact-list {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .compact-contact-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 6.5pt;
          color: #374151;
        }
        .compact-contact-item svg {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
          stroke: #6b7280;
        }
        .compact-contact-item a {
          color: #4f46e5;
          text-decoration: none;
        }

        /* ── Skill tags ── */
        .compact-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
        }
        .compact-skill-tag {
          background: #f3f4f6;
          color: #374151;
          font-size: 6.5pt;
          padding: 1px 5px;
          border-radius: 2px;
        }

        /* Print tweaks */
        @media print {
          .template-compact { font-size: 7pt; }
          .compact-grid { gap: 10px; }
        }
      </style>

      <div class="compact-header">
        <h1 class="compact-name">${p.name || 'Your Name'}</h1>
        <p class="compact-title">${p.title || 'Professional Title'}</p>
      </div>

      ${p.summary ? `<div class="compact-summary">${p.summary}</div>` : ''}

      <div class="compact-grid">
        <div class="compact-col-left">
          ${leftColumn}
        </div>
        <div class="compact-col-right">
          ${rightColumn}
        </div>
      </div>
    </div>
  `;
}
