import {
  decorateBlock,
} from './aem.js';

function isCssSize(value) {
  const regex = /^-?\d+(\.\d+)?[a-zA-Z%]+$/;
  return regex.test(value.trim());
}

/**
 * Applies variant classes to elements based on following [[variant: ...]] markers.
 *
 * Expected pattern:
 * <p>Some content</p>
 * <p>[[variant: primary]]</p>
 *
 * This optimized version scans only text nodes instead of all DOM elements.
 *
 * @param {HTMLElement} main - The root element to scan for variant markers.
 */
export function decorateVariants(main) {
  if (!main) return;

  // Create a TreeWalker to efficiently iterate only text nodes
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);

  const variantRegex = /^\s*\[\[variant:\s*([^\]]+)\]\]\s*$/;
  const toRemove = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.nodeValue.trim();
    const match = text.match(variantRegex);

    if (match) {
      const variantClass = match[1].trim();
      const parent = node.parentElement;

      // Apply to previous sibling element
      let prev = parent?.previousElementSibling;

      if (!prev && parent) {
        prev = parent.parentElement?.previousElementSibling;
      }

      if (prev) {
        prev.classList.add(variantClass);
        prev.dataset.variant = variantClass;
      }

      // Mark parent element for removal (we remove later to avoid messing traversal)
      if (parent) toRemove.push(parent);
    }
  }

  // Remove all marker elements after traversal
  toRemove.forEach((el) => el.remove());
}

export function decorateAccBlocks(main) {
  if (!main) return;

  // TreeWalker para iterar solo nodos de texto
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  const toProcess = [];

  // Regex para detectar [acc-*]
  const accRegex = /^\s*\[(acc-[^\]]+)\]\s*$/;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.nodeValue.trim();
    const match = text.match(accRegex);

    if (match) {
      const accClass = match[1].trim();
      const parent = node.parentElement;

      if (parent) toProcess.push({ parent, accClass });
    }
  }

  // Procesar cada bloque encontrado
  toProcess.forEach(({ parent, accClass }) => {
    let blockParent = parent.closest(`[data-aue-model="${accClass}"], [data-block-name="${accClass}"]`);

    if (!blockParent) {
      blockParent = parent.parentElement;
      if (blockParent.childElementCount === 1) {
        blockParent = blockParent.parentElement;
      }
    }

    if (!blockParent) return;

    // Poner la clase en el div padre
    if (!blockParent.classList.contains(accClass)) {
      blockParent.classList.add(accClass);
    }

    // Transformar todos los <p> hijos en <div>
    const children = Array.from(blockParent.children);

    children.forEach((child) => {
      const innerText = child.textContent;

      // Crear un div interno
      const innerDiv = document.createElement('div');
      innerDiv.textContent = innerText;

      // Reemplazar el p original por un div que lo envuelve
      const wrapperDiv = document.createElement('div');
      wrapperDiv.appendChild(innerDiv);

      blockParent.replaceChild(wrapperDiv, child);
    });

    // Ejecutar decorateBlock sobre el div padre
    if (typeof decorateBlock === 'function') {
      decorateBlock(blockParent);
    }
  });
}

export function decorateSeparators(main) {
  if (!main) return;

  // Create a TreeWalker to efficiently iterate only text nodes
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);

  const separatorRegex = /^\s*\[\[separator:\s*(.+?)\s*\]\]\s*$/;
  const toRemove = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.nodeValue.trim();
    const match = text.match(separatorRegex);

    if (match) {
      const variantOrValue = match[1].trim();

      const parent = document.createElement('div');
      parent.classList.add('acc-separator-wrapper');

      const block = document.createElement('div');
      block.classList.add('acc-separator');

      if (isCssSize(variantOrValue)) {
        block.style.height = variantOrValue;
      } else {
        parent.classList.add(variantOrValue);
      }

      block.append(document.createElement('hr'));
      parent.append(block);

      const existingParent = node.parentElement;
      existingParent.before(parent);

      if (existingParent) toRemove.push(existingParent);
    }
  }

  // Remove all marker elements after traversal
  toRemove.forEach((el) => el.remove());
}

export function applyVariantAttributes(newElem, variantElem) {
  if (!newElem || !variantElem) return;

  newElem.classList.add(...variantElem.classList);

  Object.entries(variantElem.dataset).forEach(([key, value]) => {
    newElem.dataset[key] = value;
  });
}

export default decorateVariants;
