# ember-intl-tel-input

An Ember.js addon for entering and validating international telephone numbers.

Please check out the [demo page](http://justin-lau.github.io/ember-intl-tel-input/) to see the addon in action.

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Installation

```bash
$ ember install ember-intl-tel-input
```

## Basic Usage

Just place the `{{intl-tel-input}}` component in the handlebars template, as you would have guessed.

```htmlbars
{{intl-tel-input}}
```

The component derives from `Ember.TextField`, anything you can do with the input helper can also be done with this component.

```htmlbars
{{intl-tel-input value="555-5555"}}
```

## With Utilities Script

With the [utilities script](https://github.com/Bluefieldscom/intl-tel-input#utilities-script) included, the `autoFormat` and `autoPlaceholder` options are automatically enabled.

```javascript
// Brocfile.js

var app = new EmberAddon({

  intlTelInput: {
    includeUtilsScript: true, // default to false
  },

});
```

```htmlbars
{{intl-tel-input}}
```

## Lookup User's Country
`intl-tel-input` provides a convenient way to look up the user's country based on their IP addresses. This example uses [Telize](http://www.telize.com/) for demonstration.

```javascript
// controller

geoIpLookupFunc: function(callback) {
  $.getJSON('//www.telize.com/geoip')
   .always(function(resp) {
     if (!resp || !resp.country_code) {
       callback('');
     }

     callback(resp.country_code);
   });
}
```

```htmlbars
{{intl-tel-input
  defaultCountry="auto"
  geoIpLookup=geoIpLookupFunc}}
```

## Running The Demo Page Locally

Run `ember server`, and visit the demo page at http://localhost:4200.

## Credits

This is a wrapper library. It simply wraps the API of [the original jQuery plugin](http://jackocnr.com/intl-tel-input.html) created by [Jack O'Connor](http://jackocnr.com/) into an [Ember.js](http://emberjs.com/) component.

The original jQuery plugin also depends on several other open-source libraries:

* Flag images from region-flags
* Original country data from mledoze's World countries in JSON, CSV and XML
* Formatting/validation/example number code from Google's libphonenumber
* Lookup user's country using ipinfo.io

This [addon's demo page](http://justin-lau.github.io/ember-intl-tel-input/) uses [Telize](http://www.telize.com/) for a fast, SSL-supported, yet FREE Geo IP service.

The layout and color theme of the demo page comes from [Twitter's Bootstrap](http://getbootstrap.com/) and [Ember.js](http://emberjs.com/), respectively.
