const handleClick = (e) => {
  console.log('handling');
  const node = e.target;
  if (node.parentNode.className == 'has-submenu') {
    closeMenus();
    node.parentNode.className = 'has-submenu open';
    node.setAttribute('aria-expanded', 'true');
  } else closeMenus();
};

const closeMenus = () => {
  const element = document.getElementsByClassName('has-submenu open')[0];
  if (element) {
    element.className = 'has-submenu';
    element.children[0].setAttribute('aria-expanded', 'false');
  }
};

const setupListeners = (className, eventType, callback) => {
  const elements = document.getElementsByClassName(className);
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const init = () => {
  setupListeners('title-button', 'click', handleClick);
};

window.addEventListener('DOMContentLoaded', init);
