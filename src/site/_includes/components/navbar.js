const navBarVM = new Vue({
  delimiters: ["${", "}"],
  el: "#vue-nav-menu",
  data: {
    label: "Nav",
    instantiated: true
  },
  methods: {
    humanizeURL: function(url) {
      return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    }
  }
});
