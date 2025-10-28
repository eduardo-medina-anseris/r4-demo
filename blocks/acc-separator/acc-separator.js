import {
  applyVariantAttributes,
} from '../../scripts/theme-utils.js';

export default function decorate(block) {
  const blockSettings = {};

  const pairContainers = block.querySelectorAll(':scope > div');

  pairContainers.forEach((container) => {
    const paragraphs = container.querySelectorAll('p');

    if (paragraphs.length >= 2) {
      const key = paragraphs[0].textContent.trim();
      const value = paragraphs[1].textContent.trim();

      blockSettings[key] = value;
    }
  });
  const hr = document.createElement('hr');

  if (blockSettings.separation) {
    hr.style.height = blockSettings.separation;
  }
  const newBlock = document.createElement('div');
  applyVariantAttributes(newBlock, block);

  const wrapperDiv = block.parentElement;

  if (blockSettings.variant && !newBlock.dataset.variant) {
    newBlock.dataset.variant = blockSettings.variant;
    wrapperDiv.classList.add(blockSettings.variant);
  }

  block.innerHTML = '';
  block.append(hr);
}
