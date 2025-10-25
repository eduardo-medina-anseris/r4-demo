function extractTwoDivChildren(block) {
  if (!block) return [];

  const divs = Array.from(block.querySelectorAll(':scope > div'));
  return divs.map((div) => Array.from(div.children).map((child) => child.outerHTML.trim()));
}

function cleanH(h) {
  if (!(h instanceof HTMLElement) || h.tagName !== 'H4') return;
  h.innerHTML = h.textContent.trim();
}

function buildBlockGeneCC19(data) {
  if (!data.length) return document.createTextNode('');
  const headerGroup = data[0] || [];
  const title = headerGroup.find((html) => html.includes('<h') || html.includes('<p')) || '';
  const description = headerGroup.find((html) => html.includes('<p')) || '';

  const wrapper = document.createElement('div');
  wrapper.className = 'block-gene-cc19';

  const leftBlock = document.createElement('div');
  leftBlock.className = 'block-left-cc19';

  const titleElement = document.createElement('div');
  titleElement.innerHTML = title;
  titleElement.querySelector('h1,h2,h3,h4,h5,h6');

  const descContainer = document.createElement('div');
  descContainer.className = 'cuerpo type-list';
  descContainer.innerHTML = description;
  leftBlock.appendChild(descContainer);

  const rightBlock = document.createElement('div');
  rightBlock.className = 'block-right-cc19';

  const cards = data.slice(1).flat();
  cards.forEach((cardHtml) => {
    const temp = document.createElement('div');
    temp.innerHTML = cardHtml.trim();

    const card = document.createElement('div');
    card.className = 'block-single';

    const img = temp.querySelector('img');
    const h4 = temp.querySelector('h4,h3,h2,h5');
    const p = temp.querySelector('p:not(:has(*))');
    const desc = temp.querySelectorAll('p:not(:has(*))')[1] || null;

    if (img) card.appendChild(img);
    if (h4) {
      cleanH(h4);
      card.appendChild((h4));
    }
    if (p) card.appendChild(p);
    if (desc) card.appendChild(desc);
    rightBlock.appendChild(card);
  });

  wrapper.appendChild(leftBlock);
  wrapper.appendChild(rightBlock);

  return wrapper;
}

export default function decorate(block) {
  const data = extractTwoDivChildren(block);
  const newBlock = buildBlockGeneCC19(data);
  block.replaceWith(newBlock);
}
