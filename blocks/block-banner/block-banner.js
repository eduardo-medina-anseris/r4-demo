/* eslint-disable */
export default function decorate(block) {
  const data=extractKeyValuePairs(block)
  block.replaceWith(buildHero(data.title, data.pretitle, data.subtitle, data.btn, data.img));
}

function buildHero(title, pretitle, subtitle, link, picture) {
  // <section>
  const section = document.createElement('section');
  section.className = 'block-banner-simple visibility-component visibility-todos';

  // <div class="container block-baner-info-img right">
  const container = document.createElement('div');
  container.className = 'container block-baner-info-img right';

  // Estructura interna: block-info > block-info-inner > block-info-inner-inside
  const blockInfo = document.createElement('div');
  blockInfo.className = 'block-info';

  const blockInfoInner = document.createElement('div');
  blockInfoInner.className = 'block-info-inner';

  const blockInfoInside = document.createElement('div');
  blockInfoInside.className = 'block-info-inner-inside';




  const newPretitle = document.createElement('h1');
  newPretitle.classList.add('titulo-top-mayu')
  while (pretitle.firstChild) {
    newPretitle.appendChild(pretitle.firstChild);
  }
  title.classList.add('title-prin','subtitleExist');


  const newSubtitle = document.createElement('div');
  newSubtitle.classList.add('subtitle-banner');
  while (subtitle.firstChild) {
    newSubtitle.appendChild(subtitle.firstChild);
  }
  blockInfoInside.append(newPretitle, title , newSubtitle);
  link ? blockInfoInside.append(link) : null;
  blockInfoInner.appendChild(blockInfoInside);
  blockInfo.appendChild(blockInfoInner);

  // Imagen (block-img center)
  const blockImg = document.createElement('div');
  blockImg.className = 'block-img center';
  blockImg.appendChild(picture);

  // Composición final
  container.append(blockInfo, blockImg);
  section.appendChild(container);

  return section;
}
export function toNode(html) {
  if (!html) return document.createTextNode('');
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  // Si hay más de un elemento, los envolvemos en un div
  if (template.content.childNodes.length > 1) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapped-content');
    wrapper.append(...template.content.childNodes);
    return wrapper;
  }

  return template.content.firstElementChild || template.content.firstChild;
}

export function extractKeyValuePairs(block) {
  const result = {};
  if (!block) return result;
  block.querySelectorAll(':scope > div').forEach((row) => {
    const keyEl = row.querySelector(':scope > div:first-child p');
    const valueEl = row.querySelector(':scope > div:nth-child(2)');

    if (!keyEl || !valueEl) return;

    const key = keyEl.textContent.trim();
    result[key] = toNode(valueEl.innerHTML.trim());
  });
  return result;
}
