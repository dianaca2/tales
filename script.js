document.addEventListener('DOMContentLoaded', function() {
  // Configurar el workerSrc de PDF.js
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs/build/pdf.worker.mjs'; // o pdf.worker.js

  // Función para cargar y renderizar el PDF
  function loadAndRenderPDF(pdfUrl) {
    const canvas = document.getElementById('pdfCanvas');
    const context = canvas.getContext('2d');

    pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
      pdf.getPage(1).then(function(page) {
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      });
    });
  }

  // Agregar event listeners a los enlaces de los PDFs
  const pdfLinks = document.querySelectorAll('.pdf-link');
  pdfLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const pdfUrl = this.getAttribute('data-pdf');
      loadAndRenderPDF(pdfUrl);
    });
  });
});
