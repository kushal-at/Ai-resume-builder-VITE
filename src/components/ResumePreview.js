import { renderModern } from '../templates/modern.js';
import { renderProfessional } from '../templates/professional.js';
import { renderCreative } from '../templates/creative.js';
import { renderElegant } from '../templates/elegant.js';
import { renderCompact } from '../templates/compact.js';

export class ResumePreview {
  constructor(container, initialTemplate = 'modern') {
    this.container = container;
    this.currentTemplate = initialTemplate;
  }

  setTemplate(templateName) {
    this.currentTemplate = templateName;
  }

  update(state) {
    if (!this.container) return;
    let html = '';
    switch (this.currentTemplate) {
      case 'professional': html = renderProfessional(state); break;
      case 'creative':     html = renderCreative(state); break;
      case 'elegant':      html = renderElegant(state); break;
      case 'compact':      html = renderCompact(state); break;
      case 'modern':
      default:             html = renderModern(state); break;
    }
    this.container.innerHTML = html;
  }
}
