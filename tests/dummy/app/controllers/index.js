import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({

  geoIpLookupFunc: function(callback) {
    $.getJSON('http://ipinfo.io/')
     .always(function(resp) {
       if (!resp || !resp.country) {
         callback('');
       }

       callback(resp.country);
     });
  },

});
