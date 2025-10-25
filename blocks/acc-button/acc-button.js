import getVariants from './variants.js';

export default function decorate(a) {
  if (a.nodeName !== 'A') return;

  if (a.href !== a.textContent) {
    if (!a.querySelector('img')) {
      const up = a.parentElement;
      const editorElem = a.closest('.acc-button');

      if (up.childNodes.length === 1 && !editorElem) { // Case for Word
        a.className = 'acc-button--link'; // default
        up.classList.add('acc-button');
        const variants = getVariants();
        const cmpVariant = up.dataset.variant;
        if (cmpVariant) {
          const variantProperties = variants[cmpVariant];
          if (variantProperties && variantProperties.typography) {
            up.classList.add(variantProperties.typography);
          }
        }
      }

      if (up.childNodes.length === 1 && editorElem && !a.classList.contains('acc-button--link')) { // Case for Universal editor
        const rootElem = editorElem.parentElement;
        // Safely get data from the children based on their expected indices (0-based)
        // The child with the link text is at index 1
        const newLinkText = (editorElem.children[1] && editorElem.children[1].textContent) ? editorElem.children[1].textContent.trim() : '';

        // The child with the title text is at index 2
        const newLinkTitle = (editorElem.children[2] && editorElem.children[2].textContent) ? editorElem.children[2].textContent.trim() : '';

        // The child with the variant class ("black") is at index 3
        const extraClassText = (editorElem.children[3] && editorElem.children[3].textContent) ? editorElem.children[3].textContent.trim() : '';

        // 1. Mover la clase variante al rootElem (acc-button-wrapper)
        if (extraClassText) {
          editorElem.classList.add(extraClassText);
        }

        // 2. Reconfigurar el elemento 'a' con los nuevos datos
        a.className = 'acc-button--link';
        a.removeAttribute('data-block-name');
        a.removeAttribute('data-block-status');
        a.textContent = newLinkText;
        a.title = newLinkTitle;

        // 4. Limpiar el contenido de editorElem (esto elimina todos los <div>s anidados)
        editorElem.innerHTML = '';

        // 5. Reinsertar el 'a' limpio directamente dentro del editorElem
        editorElem.appendChild(a);

        // 6. Limpiar el contenido de rootElem y reinsertar editorElem
        rootElem.innerHTML = '';
        rootElem.appendChild(editorElem);
      }
    }
  }
}
