import VueTypeahead from "./VueTypeahead";

const Plugin = {
  install(Vue, options = {}) {
    Vue.component(options.name ? options.name : "vue-typeahead", VueTypeahead);
  }
};

export default Plugin;
