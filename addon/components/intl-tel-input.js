/* global intlTelInputUtils */

import Ember from 'ember';
import layout from '../templates/components/intl-tel-input';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'input',
  attributeBindings: ['type'],
  type: 'tel',

  /**
   * When `autoFormat` is enabled, this option will support formatting
   * extension numbers e.g. "+1 (702) 123-1234 ext. 12345".
   *
   * @deprecated
   * @property allowExtensions
   * @type Boolean
   * @default false
   */
  allowExtensions: Ember.computed({
    set() {
      Ember.deprecate('The allowExtensions & autoFormat options are not supported anymore', false, {
        id: 'ember-intl-tel-input.auto-format',
        until: '2.0.0'
      });
    },

    get() {}
  }),


  /**
   * This property is deprecated and not supported anymore by intl-tel-input.
   * Format the number on each keypress according to the country-specific
   * formatting rules. This will also prevent the user from entering invalid
   * characters (triggering a red flash in the input - see
   * [Troubleshooting](https://github.com/Bluefieldscom/intl-tel-input#troubleshooting)
   * to customise this). Requires the utilities script.
   *
   * @deprecated
   * @property autoFormat
   * @type Boolean
   * @default true
   */
  autoFormat: Ember.computed({
    set() {
      Ember.deprecate('The autoFormat option is not supported anymore', false, {
        id: 'ember-intl-tel-input.auto-format',
        until: '2.0.0'
      });
    },

    get() {}
  }),

  /**
   * Format the input value during initialisation.
   *
   * @property formatOnInit
   * @type Boolean
   * @default true
   */
  formatOnInit: true,

  /**
   * If there is just a dial code in the input: remove it on blur, and re-add
   * it on focus. This is to prevent just a dial code getting submitted with
   * the form. Requires `nationalMode` to be set to `false`.
   *
   * @property autoHideDialCode
   * @type Boolean
   * @default true
   */
  autoHideDialCode: true,

  /**
   * Add or remove input placeholder with an example number for the selected
   * country. Requires the utilities script.a
   * Possible values are "polite", "aggresive" and "off"
   *
   * @property autoPlaceholder
   * @type String
   * @default polite
   */
  autoPlaceholder: Ember.computed({
    get() {
      return this._autoPlaceholder;
    },

    set(key, value) {
      const validType = typeof value === 'string';
      Ember.deprecate('autoPlaceholder now is a String property', validType, {
        id: 'ember-intl-tel-input.auto-placeholder-boolean',
        until: '2.0.0'
      });

      this._autoPlaceholder = validType ? value : (value ? 'polite' : 'off');
      return value;
    }
  }),

  _autoPlaceholder: 'polite',

  /**
   * Set the initial country by it's country code. You can also set it to
   * `"auto"`, which will lookup the user's country based on their
   * IP address - requires the `geoIpLookup` option
   * - [see example](http://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/default-country-ip.html).
   * Otherwise it will just be the first country in the list. **Note that if
   * you choose to do the auto lookup, and you also happen to use the
   * [jquery-cookie](https://github.com/carhartl/jquery-cookie) plugin, it
   * will store the loaded country code in a cookie for future use.**
   *
   * @property initialCountry
   * @type String
   * @default ""
   */
  initialCountry: '',

  /**
   * Set the default country by it's country code. You can also set it to
   * `"auto"`, which will lookup the user's country based on their
   * IP address - requires the `geoIpLookup` option
   * Otherwise it will just be the first country in the list. **Note that if
   * you choose to do the auto lookup, and you also happen to use the
   * [jquery-cookie](https://github.com/carhartl/jquery-cookie) plugin, it
   * will store the loaded country code in a cookie for future use.**
   *
   * @property defaultCountry
   * @type String
   * @deprecated
   * @default ""
   */
  defaultCountry: Ember.computed.deprecatingAlias('initialCountry', {
    id: 'ember-intl-tel-input.deprecate-default-country',
    until: '2.0.0'
  }),

  /**
   * When setting `defaultCountry` to `"auto"`, we need to use a special
   * service to lookup the location data for the user. Write a custom method to
   * get the country code.
   *
   * @property geoIpLookup
   * @type Function
   * @default null
   */
  geoIpLookup: null,

  /**
   * Allow users to enter national numbers (and not have to think about
   * international dial codes). Formatting, validation and placeholders still
   * work. Then you can use `getNumber` to extract a full international
   * number - [see example](http://jackocnr.com/lib/intl-tel-input/examples/gen/national-mode.html).
   * This option now defaults to `true`, and it is recommended that you leave it
   * that way as it provides a better experience for the user.
   *
   * @property nationalMode
   * @type Boolean
   * @default true
   */
  nationalMode: true,

  /**
   * Gets the type of the current `number`. Setting `numberType` when `value`
   * is empty and no custom placeholder is set will affect the format of the
   * auto placeholder. Requires the utilities script.
   *
   * Supported values:
   * - "FIXED_LINE"
   * - "MOBILE"
   * - "FIXED_LINE_OR_MOBILE"
   * - "TOLL_FREE"
   * - "PREMIUM_RATE"
   * - "SHARED_COST"
   * - "VOIP"
   * - "PERSONAL_NUMBER"
   * - "PAGER"
   * - "UAN"
   * - "VOICEMAIL"
   * - "UNKNOWN"
   *
   * @property numberType
   * @type String
   * @default "MOBILE"
   */
  numberType: Ember.computed('number', {
    get() {
      if (this.get('hasUtilsScript')) {

        let typeNumber = this.$().intlTelInput('getNumberType');
        for(let key in intlTelInputUtils.numberType) {
          if (intlTelInputUtils.numberType[key] === typeNumber) {
            return key;
          }
        }

      }

      return 'MOBILE';
    },
    set(key, newValue) {
      if (this.get('hasUtilsScript') && newValue in intlTelInputUtils.numberType) {
        return newValue;
      }

      return 'MOBILE';
    }
  }),

  /**
   * Display only the countries you specify - [see example](http://jackocnr.com/lib/intl-tel-input/examples/gen/only-countries-europe.html).
   *
   * @property onlyCountries
   * @type Array
   * @default "MOBILE"
   */
  onlyCountries: undefined,

  /**
   * Specify the countries to appear at the top of the list.
   *
   * @property preferredCountries
   * @type Array
   * @default ["us", "gb"]
   */
  preferredCountries: ['us', 'gb'],

  /**
   * Specify the format of the `number` property. Requires the utilities
   * script.
   *
   * Supported values:
   * - "E164"          e.g. "+41446681800"
   * - "INTERNATIONAL" e.g. "+41 44 668 1800"
   * - "NATIONAL"      e.g. "044 668 1800"
   * - "RFC3966"       e.g. "tel:+41-44-668-1800"
   *
   * @property numberFormat
   * @type String
   * @default 'E164'
   */
  _numberFormat: 'E164',
  numberFormat: Ember.computed('value', {
    get() {
      return this.get('_numberFormat');
    },
    set(key, newValue) {
      if (this.get('hasUtilsScript') && newValue in intlTelInputUtils.numberFormat) {
        this.set('_numberFormat', newValue);
      }

      return this.get('_numberFormat');
    }
  }),

  /**
   * Get the current number in the format specified by the `numberFormat`
   * property. Note that even if `nationalMode` is enabled, this can still
   * return a full international number. Requires the utilities script.
   *
   * @property number
   * @type String
   * @readOnly
   */
  number: '',

  /**
   * Get the extension part of the current number, so if the number was
   * "+1 (702) 123-1234 ext. 12345" this would return "12345".
   *
   * @property extension
   * @type String
   * @readOnly
   */
  extension: Ember.computed('number', {
    get() {
      return this.$().intlTelInput('getExtension');
    },
    set() { /* no-op */ }
  }),

  /**
   * Get the country data for the currently selected flag.
   *
   * @property selectedCountryData
   * @type Object
   * @readOnly
   */
  selectedCountryData: Ember.computed('number', {
    get() {
      return this.$().intlTelInput('getSelectedCountryData');
    },
    set() { /* no-op */ }
  }),

  /**
   * Get the validity of the current `number`.
   *
   * @property isValidNumber
   * @type Boolean
   * @readOnly
   */
  isValidNumber: Ember.computed('number', {
    get() {
      return this.$().intlTelInput('isValidNumber');
    },
    set() { /* no-op */ }
  }),

  /**
   * Get more information about a validation error. Requires the utilities
   * scripts.
   *
   * @property isValidNumber
   * @type String
   * @readOnly
   */
  validationError: Ember.computed('number', {
    get() {
      if (this.get('hasUtilsScript')) {
        let errorNumber = this.$().intlTelInput('getValidationError');
        for(let key in intlTelInputUtils.validationError) {
          if (intlTelInputUtils.validationError[key] === errorNumber) {
            return key;
          }
        }
      }
    },
    set() { /* no-op */ }
  }),

  /**
   * Returns whether the untilities script presents.
   *
   * @property hasUtilsScript
   * @type Boolean
   * @readOnly
   */
  hasUtilsScript: Ember.computed({
    get() {
      return (typeof intlTelInputUtils !== 'undefined');
    },
    set() { /* no-op */ }
  }),

  /**
   * Initiate the intlTelInput instance.
   *
   * @method didInsertElement
   */
  didInsertElement() {
    this._super(...arguments)
    this.$().on('input', event => this.send('handleUpdate', event));
    this.$().intlTelInput({
      autoHideDialCode: this.get('autoHideDialCode'),
      autoPlaceholder: this.get('autoPlaceholder'),
      initialCountry: this.get('initialCountry'),
      geoIpLookup: this.get('geoIpLookup'),
      nationalMode: this.get('nationalMode'),
      numberType: this.get('numberType'),
      onlyCountries: this.get('onlyCountries'),
      preferredCountries: this.get('preferredCountries'),
    });
  },

  didRender() {
    this._super(...arguments)
    const value = this.get('value')
    if (value) {
      this.$().intlTelInput('setNumber', value)
    }
  },

  /**
   * Destroy the intlTelInput instance.
   *
   * @method willDestroyElement
   */
  willDestroyElement() {
    this.$().intlTelInput('destroy');
  },

  actions: {
    handleUpdate(event) {
      if (this.get('hasUtilsScript')) {
        const numberFormat = intlTelInputUtils.numberFormat[this.get('numberFormat')];
        const formatted = this.$().intlTelInput('getNumber', numberFormat);
        this.set('number', formatted);
      }

      this.sendAction('update', event.target.value, this.getProperties([
        'number',
        'extension',
        'selectedCountryData',
        'isValidNumber',
        'validationError'
      ]));
    }
  }
});
