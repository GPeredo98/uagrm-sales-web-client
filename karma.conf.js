module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage'
        ]
      }
    }
  });
};