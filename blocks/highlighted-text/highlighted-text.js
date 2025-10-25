/* eslint-disable */
export default function decorate(block) {
  console.log('El block es un highlighted-text', block);
  const data=extractTwoDivChildren(block)
  block.replaceWith(buildCc10("highlighted-text", data[0]));
}

export function toNode(html) {
  if (!html) return document.createTextNode('');
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

function extractTwoDivChildren(block) {
  if (!block) return [];

  const divs = Array.from(block.querySelectorAll(':scope > div')).slice(0, 2);
  return divs.map(div => {
    return Array.from(div.children).map(child => toNode(child.innerHTML.trim()));
  });
}

function buildCc10(cmpName, items) {
  // Contenedor principal
  console.log('data.items:', items);
  const cc10 = document.createElement('div');
  cc10.className = 'block-cc10 black-background';
  cc10.setAttribute('cmp-data-layer-name', cmpName);

  // Contenedor interno
  const container = document.createElement('div');
  container.className = 'container';

  // Wrapper de items
  const blockGene = document.createElement('div');
  blockGene.className = 'block-cc10-gene';

  // Generar cada item
  items.forEach((item) => {
    console.log('item:', item.children);


    const single = document.createElement('div');
    single.className = 'block-cc10-single';

    // p con número / título
    const p1 = document.createElement('p');
    p1.className = 'cifras-destacadas-blancas';
    p1.setAttribute('data-number', title);

    const span = document.createElement('span');
    console.log(item.querySelector('h1 h2 h3 h4 h5 h6'))
    span.textContent = item.querySelector('h1, h2, h3, h4 ,h5 ,h6').textContent;
    p1.appendChild(span);

    // p con descripción
    const p2 = document.createElement('p');
    p2.className = 'cuerpo-gris-medio';
    p2.textContent = item.querySelector('p').textContent;

    // Componer item
    single.append(p1, p2);
    blockGene.appendChild(single);
  });

  // Armar jerarquía final
  container.appendChild(blockGene);
  cc10.appendChild(container);

  return cc10;
}
