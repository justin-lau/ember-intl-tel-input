import Ember from 'ember';
import layout from '../templates/components/intl-tel-input';

export default Ember.TextField.extend({
  layout: layout,
  tagName: 'input',
  attributeBindings: ['type'],
  type: 'tel',

  /**
   * When `autoFormat` is enabled, this option will support formatting
   * extension numbers e.g. "+1 (702) 123-1234 ext. 12345".
   *
   * @property allowExtensions
   * @type Boolean
   * @default false
   */
  allowExtensions: false,

  /**
   * Format the number on each keypress according to the country-specific
   * formatting rules. This will also prevent the user from entering invalid
   * characters (triggering a red flash in the input - see
   * [Troubleshooting](https://github.com/Bluefieldscom/intl-tel-input#troubleshooting)
   * to customise this). Requires the `utilsScript` option.
   *
   * @property autoFormat
   * @type Boolean
   * @default true
   */
  autoFormat: true,

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
   * country. Requires the `utilsScript` option.
   *
   * @property autoPlaceholder
   * @type Boolean
   * @default true
   */
  autoPlaceholder: true,

  /**
   * Set the default country by it's country code. You can also set it to
   * `"auto"`, which will lookup the user's country based on their
   * IP address - requires the `geoIpLookup` option - [see example](http://jackocnr.com/lib/intl-tel-input/examples/gen/default-country-ip.html).
   * Otherwise it will just be the first country in the list. **Note that if
   * you choose to do the auto lookup, and you also happen to use the
   * [jquery-cookie](https://github.com/carhartl/jquery-cookie) plugin, it
   * will store the loaded country code in a cookie for future use.**
   *
   * @property defaultCountry
   * @type String
   * @default ""
   */
  defaultCountry: "",

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
   * Specify one of the keys from the global enum `intlTelInputUtils.numberType`
   * e.g. "FIXED_LINE" to tell the plugin you're expecting that type of number.
   * Currently this is only used to set the placeholder to the right type of
   * number.
   *
   * @property numberType
   * @type String
   * @default "MOBILE"
   */
  numberType: "MOBILE",

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
  preferredCountries: ["us", "gb"],

  /**
   * @method setupIntlTelInput
   */
  setupIntlTelInput: Ember.on('didInsertElement', function() {
    this.$().intlTelInput({
      allowExtensions: this.get('allowExtensions'),
      autoFormat: this.get('autoFormat'),
      autoHideDialCode: this.get('autoHideDialCode'),
      autoPlaceholder: this.get('autoPlaceholder'),
      defaultCountry: this.get('defaultCountry'),
      geoIpLookup: this.get('geoIpLookup'),
      nationalMode: this.get('nationalMode'),
      numberType: this.get('numberType'),
      onlyCountries: this.get('onlyCountries'),
      preferredCountries: this.get('preferredCountries'),
    });
  }),

  /**
   * @method teardownIntlTelInput
   */
  teardownIntlTelInput: Ember.on('willDestroyElement', function() {
    this.$().intlTelInput('destroy');
  }),

});
