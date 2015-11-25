/* jshint node:true */
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var isProduction = EmberApp.env() === 'production';
var path = require('path');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    sassOptions: {
      extension: 'scss',
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets',
      ],
    },

    'ember-prism': {
      components: [
        'handlebars',
        'javascript',
      ],
      plugins: [
        'show-language',
      ],
    },

    fingerprint: {
      enabled: false,
    },

    intlTelInput: {
      includeUtilsScript: true,
    },
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  function importFromBower(relativePath, options) {
    options = options || {};
    app.import(path.join(app.bowerDirectory, relativePath), options);
  }

  importFromBower('bootstrap-sass/assets/javascripts/bootstrap.js');

  if (!isProduction) {
    importFromBower('es5-shim/es5-shim.js', { type: 'test' });
  }

  return app.toTree();
};
