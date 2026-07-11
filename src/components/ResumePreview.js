import { renderModern } from '../templates/modern.js';
import { renderProfessional } from '../templates/professional.js';
import { renderCreative } from '../templates/creative.js';

export class ResumePreview {
  /**
   * @param {HTMLElement} container - DOM wrapper for the preview sheet
   * @param {string} initialTemplate - 'modern', 'professional', or 'creative'
   */
  constructor(container, initialTemplate = 'modern') {
    this.container = container;
    this.currentTemplate = initialTemplate;
  }

  setTemplate(templateName) {
    this.currentTemplate = templateName;
  }

  /**
   * Re-renders the resume with the updated data model
   * @param {object} state - Resume state
   */
  update(state) {
    if (!this.container) return;

    let html = '';
    
    // Choose rendering strategy based on selected template
    switch (this.currentTemplate) {
      case 'professional':
        html = renderProfessional(state);
        break;
      case 'creative':
        html = renderCreative(state);
        break;
      case 'modern':
      default:
        html = renderModern(state);
        break;
    }

    // Set inside document wrapper sheet
    this.container.innerHTML = html;
  }
}
