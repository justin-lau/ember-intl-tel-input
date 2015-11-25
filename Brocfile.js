/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var isProduction = EmberApp.env() === 'production';
var path = require('path');

/*
  This Brocfile specifes the options for the dummy test app of this
  addon, located in `/tests/dummy`

  This Brocfile does *not* influence how the addon or the app using it
  behave. You most likely want to be modifying `./index.js` or app's Brocfile
*/

var app = new EmberAddon({

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

function importFromBower(relativePath, options) {
  options = options || {};
  app.import(path.join(app.bowerDirectory, relativePath), options);
}

importFromBower('bootstrap-sass/assets/javascripts/bootstrap.js');

if (!isProduction) {
  importFromBower('es5-shim/es5-shim.js', { type: 'test' });
}

module.exports = app.toTree();
