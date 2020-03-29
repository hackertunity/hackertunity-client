const navBarVM = new Vue({
  delimiters: ["${", "}"],
  el: "#nav-menu",
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
