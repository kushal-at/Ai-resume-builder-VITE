import html2pdf from 'html2pdf.js';

/**
 * Exports a DOM element as a polished PDF using html2pdf.js
 * @param {HTMLElement} element - The DOM node of the resume sheet
 * @param {string} filename - Output file name
 * @returns {Promise<void>}
 */
export function exportToPDF(element, filename = 'resume.pdf') {
  if (!element) {
    return Promise.reject(new Error('Element to export is missing.'));
  }

  // Pre-export tweaks: make sure any transformations are reset so canvas rendering maps 1:1
  const originalTransform = element.style.transform;
  element.style.transform = 'none';

  const opt = {
    margin:       0, // Already handled inside templates margins
    filename:     filename,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { 
      scale: 2.5, // Crisp resolution for print
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };

  return html2pdf()
    .from(element)
    .set(opt)
    .save()
    .then(() => {
      // Restore original preview transformation
      element.style.transform = originalTransform;
    })
    .catch((err) => {
      element.style.transform = originalTransform;
      console.error('PDF generation error:', err);
      throw err;
    });
}
