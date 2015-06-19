import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({

  geoIpLookupFunc: function(callback) {
    $.getJSON('//www.telize.com/geoip')
     .always(function(resp) {
       if (!resp || !resp.country_code) {
         callback('');
       }

       callback(resp.country_code);
     });
  },

});
