/* eslint-disable */
/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const fragments = extractTwoDivChildren(block);
  const content = mapFragments(fragments);
  block.replaceWith(buildFooterUp(content));
}

function buildFooterUp(content) {

  const title = content[0].title?.[0]?.textContent || '';
  const color = content[1].color?.[0]?.textContent || '#3b3b3b';
  const bg = content[2]['bg-img']?.[0]?.querySelector('source[type="image/png"]')?.getAttribute('srcset')|| '';
  const logo = content[3]['logo']?.[0]?.querySelector('source[type="image/png"]')?.getAttribute('srcset')|| '';

  // Contenedor principal
  const footerUp = document.createElement('div');
  footerUp.className = 'footer-up';

  // Container con background
  const container = document.createElement('div');
  container.className = 'container block-gene';
  container.style.backgroundImage = `url("${bg}")`;
  footerUp.appendChild(container);

  // Bloque izquierdo
  const blockLeft = document.createElement('div');
  blockLeft.className = 'block-left';
  container.appendChild(blockLeft);

  const blockSingle = document.createElement('div');
  blockSingle.className = 'block-single';
  blockLeft.appendChild(blockSingle);

  const titleColumn = document.createElement('p');
  titleColumn.className = 'title-column';
  titleColumn.textContent = title;
  blockSingle.appendChild(titleColumn);

  const ul = document.createElement('ul');
  blockSingle.appendChild(ul);

  // Bloque derecho
  const blockRight = document.createElement('div');
  blockRight.className = 'block-right';
  container.appendChild(blockRight);

  // Logo
  const logoFooter = document.createElement('div');
  logoFooter.className = 'logo-footer';
  blockRight.appendChild(logoFooter);

  const aLogo = document.createElement('a');
  aLogo.title = 'Renta 4 Chile';
  aLogo.className = 'logo-header';
  logoFooter.appendChild(aLogo);

  const imgLogo = document.createElement('img');
  imgLogo.src = logo;
  imgLogo.alt = 'Renta 4 Chile';
  aLogo.appendChild(imgLogo);

  // Contacto
  const contact = document.createElement('div');
  contact.className = 'contact';
  blockRight.appendChild(contact);

  return footerUp;
}

function toNode(html) {
  if (!html) return document.createTextNode('');
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content;
}

function extractTwoDivChildren(block) {
  if (!block) return [];

  const divs = Array.from(block.querySelectorAll(':scope > div'));
  return divs.map(div => {
    return Array.from(div.children).map(child => {
      // convertimos cada child en fragment y lo retornamos
      return toNode(child.innerHTML.trim());
    });
  });
}

function mapFragments(arr) {
  return arr.map(innerArray => {
    const result = {};
    for (let i = 0; i < innerArray.length; i += 2) {
      const keyFragment = innerArray[i];
      const valueFragment = innerArray[i + 1];

      if (!keyFragment || !valueFragment) continue;

      const key = keyFragment.textContent?.trim();
      if (!key) continue;

      // convertimos HTMLCollection a array para poder acceder
      const valueChildren = Array.from(valueFragment.children);
      result[key] = valueChildren;
    }
    return result;
  });
}
