import getVariants from './variants.js';

function assignTypographyClasses(heading, cmpVariant, variants) {
  heading.classList.add('acc-title__heading');
  if (variants) {
    if (cmpVariant) {
      const variantProperties = variants[cmpVariant];
      if (variantProperties && variantProperties.typography) {
        heading.classList.add(variantProperties.typography);
      }
      if (variantProperties && variantProperties.typographyTablet) {
        heading.classList.add(`${variantProperties.typographyTablet}--tablet`);
      }
      if (variantProperties && variantProperties.typographyMobile) {
        heading.classList.add(`${variantProperties.typographyMobile}--mobile`);
      }
    }
  }
}

function decorateUniversalEditor(heading) {
  const divContainers = heading.querySelectorAll(':scope > div');
  let title = '';
  let cmpVariant = '';
  if (divContainers.length > 0) {
    title = divContainers[0].innerText;
  }

  if (divContainers.length > 1) {
    cmpVariant = divContainers[1]?.innerText?.trim();
  }
  const variants = getVariants();
  const variantProperties = variants[cmpVariant];

  const headingType = variantProperties?.heading || 'h2';

  const newHeading = document.createElement(headingType);
  newHeading.innerHTML = title;

  assignTypographyClasses(newHeading, cmpVariant, variants);
  heading.innerHTML = '';
  heading.append(newHeading);
}

export default function decorate(heading) {
  const headingWrapper = heading.parentElement;

  if (headingWrapper.classList.contains('acc-title-wrapper')
    && heading.tagName === 'DIV') {
    decorateUniversalEditor(heading);
    return;
  }

  if (heading.classList.contains('acc-title')) {
    // Already initialized title
    return;
  }

  const cmpVariant = heading.dataset.variant;

  const wrapper = document.createElement('div');
  wrapper.classList.add('acc-title');
  wrapper.classList.add(...heading.classList);

  if (heading.dataset.variant) {
    wrapper.dataset.variant = heading.dataset.variant;
    delete heading.dataset.variant;
  }
  heading.className = '';

  heading.parentNode.insertBefore(wrapper, heading);
  wrapper.appendChild(heading);

  const variants = getVariants();
  assignTypographyClasses(heading, cmpVariant, variants);
}
