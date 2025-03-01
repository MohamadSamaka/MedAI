export function loadStyles(styles) {
  if(!styles.length)
    return
  styles.forEach(({href, id}) => {
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      if(id)
        link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  });
}

export function unloadStyles(allowedStyles, excludeIds = ["indexStyles"]) {
  const linkElements = document.querySelectorAll('head link[rel="stylesheet"]');
  linkElements.forEach((link) => {
    const linkId = link.getAttribute('id');
    // Check if the link's href and id are in the allowedStyles array
    const isAllowed = allowedStyles.some(style => style.id === linkId);
    
    // Exclude specific ids from being removed (if any)
    let isExcluded = false; // Initialize isExcluded with a default value
    if (excludeIds)
      isExcluded = excludeIds.includes(linkId);

    if (!isAllowed && !isExcluded) 
      link.parentNode.removeChild(link);
  });
}

