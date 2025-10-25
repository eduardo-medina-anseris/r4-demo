/* eslint-disable */
export default function decorate(block) {
  const children = getSecondLevelChildren(block);

  if (children.length !== 2) return;

  convertModalVideo(children[0]);

  const newBlock = renderTwoColumnBlock(children);
  newBlock.classList.add(...block.classList); // conserva las clases del original
  block.replaceWith(newBlock);
}


export function renderTwoColumnBlock(children) {
  if (!children || children.length !== 2) return document.createDocumentFragment();

  const container = document.createElement('div');
  container.classList.add('two-column-block');

  const leftDiv = document.createElement('div');
  leftDiv.classList.add('left-column');
  leftDiv.append(...children[0].childNodes);

  const rightDiv = document.createElement('div');
  rightDiv.classList.add('right-column');
  rightDiv.append(...children[1].childNodes);

  container.append(leftDiv, rightDiv);

  return container;
}

export function getSecondLevelChildren(block) {
  if (!block) return [];
  const firstLevelDiv = block.querySelector(':scope > div');
  if (!firstLevelDiv) return [];
  return Array.from(firstLevelDiv.children);
}

function  convertModalVideo(firstChildDiv) {
  if (!firstChildDiv) return;

  const anchor = firstChildDiv.querySelector('a');
  const picture = firstChildDiv.querySelector('picture');

  if (!anchor || !picture) return;

  anchor.textContent = '';

  anchor.insertAdjacentElement('afterbegin', picture);
}
