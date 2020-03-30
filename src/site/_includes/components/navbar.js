const navBarVM = new Vue({
  delimiters: ["${", "}"],
  el: "#vue-nav-menu",
  data: {
    label: "Nav",
    inst: false
  },
  methods: {
    handleClick(str) {
      alert(str);
    }
  }
});
