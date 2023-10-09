const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 768,
  viewportWidth: 1024,

  component: {
    video: false,
    devServer: {
      framework: "create-react-app",
      bundler: 'webpack' // Your dev server
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

//react 17
