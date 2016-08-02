/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-intl-tel-input',

  included: function(app) {
    this._super.included(app);
    
    if (process.env.EMBER_CLI_FASTBOOT !== 'true') {
      var config = app.options.intlTelInput;

      if (config && true === config.includeUtilsScript) {
        app.import(app.bowerDirectory + '/intl-tel-input/lib/libphonenumber/build/utils.js');
      }

      app.import(app.bowerDirectory + '/intl-tel-input/build/js/intlTelInput.js');
      app.import(app.bowerDirectory + '/intl-tel-input/build/img/flags.png', {destDir: 'assets/images'});
      app.import(app.bowerDirectory + '/intl-tel-input/build/img/flags@2x.png', {destDir: 'assets/images'});
    }
  },
};

