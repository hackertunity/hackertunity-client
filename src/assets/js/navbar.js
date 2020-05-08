const navBarVM = new Vue({
  delimiters: ["${", "}"],
  el: "#vue-nav-menu",
  data: {
    label: "Nav",
    inst: false
  },
  methods: {
    handleClick(e) {
      const node = e.target;
      if (node.parentNode.className == "has-submenu") {
        node.parentNode.className = "has-submenu open";
        node.setAttribute('aria-expanded', "true");
      } else {
        node.parentNode.className = "has-submenu";
        node.setAttribute('aria-expanded', "false");
      }
    },
    logJson(o) {
      console.log(JSON.stringify(o))
    },
    startHover(e) {
      e.target.className = "has-submenu open";
      e.target.setAttribute('aria-expanded', "true");
    },
    endHover(e) {
      e.target.className = "has-submenu";
      e.target.setAttribute('aria-expanded', "false");
    }
  }
});
