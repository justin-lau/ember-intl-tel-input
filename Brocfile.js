/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

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

    'components': [
      'handlebars',
      'javascript',
    ],

    'plugins': [
      'show-language',
    ],

  },

  intlTelInput: {
    includeUtilsScript: true,
  },

});

app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.js');

module.exports = app.toTree();
