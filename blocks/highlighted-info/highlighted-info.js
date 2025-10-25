/* eslint-disable */
export default function decorate(block) {
  const data=extractTwoDivChildren(block)
  block.replaceWith(buildHighlightedInfo(data));
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

function buildHighlightedInfo(data) {
  // Contenedor principal
  const container = document.createElement('div');
  container.className = 'container';
  const h4 = document.createElement('h4');
  h4.className = 'title-prin';
  h4.textContent = data[0][0].textContent;
  container.appendChild(h4);

  const itemsWrapper = document.createElement('div');
  const itemsRow = document.createElement('div');
  itemsRow.className = `block-info-cc02 row item-${data[1].length}`;
  itemsWrapper.appendChild(itemsRow);

  data[1].forEach(item => {
    const blockSingle = document.createElement('div');
    blockSingle.className = 'block-single';
    const img = document.createElement('img');
    img.src = item.querySelector('img').getAttribute('src');
    img.alt = '';
    blockSingle.appendChild(img);
    const p2 = document.createElement('p');
    let result = !item.querySelector('.button-container')
      ? item.querySelector('p:not(:has(*))').innerText
      : Array.from(item.querySelectorAll('p'))
        .filter(p => !p.classList.contains('button-container'))
        .map(p => p.innerText)
        .join('<br>');
    result = result.replace(/^<br\s*\/?>/, '');

    p2.innerHTML = result;
    blockSingle.appendChild(p2);

    if (item.querySelector('.button-container')) {
      blockSingle.appendChild(item.querySelector('.button-container'));
    }

    itemsRow.appendChild(blockSingle);

  });

  container.appendChild(itemsWrapper);
  const cc02 = document.createElement('div');
  cc02.className = 'block-cc02 white-background visibility-component visibility-todos';
  cc02.appendChild(container);
  return cc02;
}
