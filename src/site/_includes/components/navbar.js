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
      e.target.parentNode.className = "has-submenu open";
    },
    endHover() {
      document.querySelector(".has-submenu.open").className = "has-submenu";
    }
  }
});
