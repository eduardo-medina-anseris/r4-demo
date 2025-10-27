import getVariants from './variants.js';

export default function decorate(heading) {
  if (heading.classList.contains('acc-title')) return;

  heading.classList.add('acc-title');

  const cmpVariant = heading.dataset.variant;
  const variants = getVariants();
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
