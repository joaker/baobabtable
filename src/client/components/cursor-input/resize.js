
// get the first number in a string, or 0
export const extractNumber = (token="") => {
  const numberStrings = token.match( /\d+/g);
  if(!numberStrings) return 0;

  const numbers = numberStrings.map(parseInt);
  const first = numbers.slice(0,1)[0];
  const result = first || 0;
  return result;
}

// create a computed styles lookup given an element
export const createGetStyle = elem => {
  const computedStyles = prop => window.getComputedStyle(elem, null).getPropertyValue(prop);
  return (...nameParts) => {
    const fullName = nameParts.join('-');
    const styleProp = computedStyles(fullName);
    return styleProp;
  };
};

// measures the virtual height of the element, offsetting for the provided property names
export const getVerticalTotal = (element, properties=[]) => {
  if(!element) return 0;

  const getStyle = createGetStyle(element);
  const vtotal = properties.reduce((memo, property) => {
    const topString = getStyle(property, 'top');
    const bottomString = getStyle(property, 'bottom');

    const top = extractNumber(topString);
    const bottom = extractNumber(bottomString);

    const vertical = top + bottom;
    return memo + vertical;
  }, 0);

  return vtotal;
};

//
export const resize = (target, properties=[]) => {
  target.style.height = 0; // flatten out the content height, leaving only padding

  const virtualHeight = target.scrollHeight; // check out the virtual height while the element is flat
  const trimHeight = getVerticalTotal(target, properties); // offset for the vertical trim properties (like padding)
  const contentHeight = Math.max(virtualHeight - trimHeight, 0); // remove the offset height from the virtual height to get the content

  target.style.height = `${contentHeight}px`;

  return contentHeight;
};

export default resize;
