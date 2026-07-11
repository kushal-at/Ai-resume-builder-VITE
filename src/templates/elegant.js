/**
 * Elegant Serif template
 */

const mailIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const phoneIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
const globeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`;
const linkedinIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

export function renderElegant(data) {
  const p = data.personal || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const skills = data.skills || [];

  // Build contact items with pipe separators
  const contacts = [];
  if (p.email) contacts.push(`<span class="contact-item">${mailIcon} ${p.email}</span>`);
  if (p.phone) contacts.push(`<span class="contact-item">${phoneIcon} ${p.phone}</span>`);
  if (p.website) contacts.push(`<span class="contact-item">${globeIcon} <a href="${p.website}" target="_blank">${p.website.replace(/^https?:\/\//, '')}</a></span>`);
  if (p.linkedin) contacts.push(`<span class="contact-item">${linkedinIcon} <a href="${p.linkedin}" target="_blank">LinkedIn</a></span>`);
  if (p.github) contacts.push(`<span class="contact-item">${githubIcon} <a href="${p.github}" target="_blank">GitHub</a></span>`);

  const hrRule = `<hr style="border: none; border-top: 1px solid #d1d5db; margin: 0.75rem 0;" />`;

  return `
    <div class="template-elegant" style="font-family: 'Inter', sans-serif; font-size: 9.5pt; line-height: 1.55; color: #1f2937;">

      <!-- Header -->
      <div style="text-align: center; margin-bottom: 0.5rem;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 24pt; font-weight: 700; margin: 0 0 0.15rem 0; color: #111827; letter-spacing: 0.02em;">
          ${p.name || 'Your Name'}
        </h1>
        <div style="font-family: 'Inter', sans-serif; font-size: 10pt; font-variant: small-caps; letter-spacing: 0.12em; color: #6b7280; margin-bottom: 0.5rem;">
          ${p.title || 'Professional Title'}
        </div>
        <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 0; font-size: 8.5pt; color: #4b5563;">
          ${contacts.join('<span style="margin: 0 0.4em; color: #d1d5db;">|</span>')}
        </div>
      </div>

      ${p.summary ? `
        ${hrRule}
        <div style="text-align: center; font-size: 9.5pt; color: #374151; max-width: 90%; margin: 0 auto; line-height: 1.6;">
          ${p.summary}
        </div>
      ` : ''}

      ${experiences.length > 0 ? `
        ${hrRule}
        <div style="margin-bottom: 0.25rem;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; font-style: italic; font-weight: 600; color: #111827; margin: 0 0 0.5rem 0; letter-spacing: 0.03em;">
            Experience
          </h2>
          ${experiences.map(exp => `
            <div style="margin-bottom: 0.6rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-weight: 600; font-size: 9.5pt; color: #111827;">${exp.company || 'Company'}</span>
                <span style="font-size: 8.5pt; color: #6b7280; white-space: nowrap;">${exp.startDate || ''} – ${exp.endDate || ''}</span>
              </div>
              <div style="font-style: italic; font-size: 9pt; color: #4b5563; margin-bottom: 0.2rem;">
                ${exp.role || 'Role'}
              </div>
              ${exp.description ? `<ul style="margin: 0.15rem 0 0 1.2rem; padding: 0; font-size: 9pt; color: #374151;">${exp.description.split('\n').filter(b => b.trim()).map(b => `<li style="margin-bottom: 0.1rem;">${b.replace(/^-\s*/, '')}</li>`).join('')}</ul>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${projects.length > 0 ? `
        ${hrRule}
        <div style="margin-bottom: 0.25rem;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; font-style: italic; font-weight: 600; color: #111827; margin: 0 0 0.5rem 0; letter-spacing: 0.03em;">
            Projects
          </h2>
          ${projects.map(proj => `
            <div style="margin-bottom: 0.6rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-weight: 600; font-size: 9.5pt; color: #111827;">${proj.name || 'Project Name'}</span>
                <span style="font-size: 8.5pt;">
                  ${proj.link ? `<a href="${proj.link}" target="_blank" style="color: #6b7280; text-decoration: underline; text-underline-offset: 2px;">View Project</a>` : ''}
                </span>
              </div>
              ${proj.description ? `<ul style="margin: 0.15rem 0 0 1.2rem; padding: 0; font-size: 9pt; color: #374151;">${proj.description.split('\n').filter(b => b.trim()).map(b => `<li style="margin-bottom: 0.1rem;">${b.replace(/^-\s*/, '')}</li>`).join('')}</ul>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${education.length > 0 ? `
        ${hrRule}
        <div style="margin-bottom: 0.25rem;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; font-style: italic; font-weight: 600; color: #111827; margin: 0 0 0.5rem 0; letter-spacing: 0.03em;">
            Education
          </h2>
          ${education.map(edu => `
            <div style="margin-bottom: 0.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <span style="font-weight: 600; font-size: 9.5pt; color: #111827;">${edu.institution || 'Institution'}</span>
                <span style="font-size: 8.5pt; color: #6b7280; white-space: nowrap;">${edu.startDate || ''} – ${edu.endDate || ''}</span>
              </div>
              <div style="font-style: italic; font-size: 9pt; color: #4b5563;">
                ${edu.degree || 'Degree'}
              </div>
              ${edu.details ? `<div style="font-size: 9pt; color: #374151; margin-top: 0.15rem;">${edu.details}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${skills.length > 0 ? `
        ${hrRule}
        <div style="margin-bottom: 0.25rem;">
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; font-style: italic; font-weight: 600; color: #111827; margin: 0 0 0.4rem 0; letter-spacing: 0.03em;">
            Skills
          </h2>
          <div style="font-size: 9pt; color: #374151; line-height: 1.6;">
            ${skills.join(', ')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}
