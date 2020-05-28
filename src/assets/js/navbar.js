const handleClick = (e) => {
  // TODO: close any  menus already open
  const node = e.target;
  if (node.parentNode.className == "has-submenu") {
    node.parentNode.className = "has-submenu open";
    node.setAttribute('aria-expanded', "true");
  } else {
    node.parentNode.className = "has-submenu";
    node.setAttribute('aria-expanded', "false");
  }
}

const startHover = (e) => {
  e.target.className = "has-submenu open";
  e.target.setAttribute('aria-expanded', "true");
}

const endHover = (e) => {
  e.target.className = "has-submenu";
  e.target.setAttribute('aria-expanded', "false");
}

const setupListeners = (className, eventType, callback) => {
  const elements = document.getElementsByClassName(className);
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const init = () => {
  setupListeners('title-button', 'click', handleClick);
}

window.addEventListener('DOMContentLoaded', init);
