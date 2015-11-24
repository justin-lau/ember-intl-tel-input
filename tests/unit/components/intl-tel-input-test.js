import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('intl-tel-input', 'Unit | Component | intl tel input', {
  unit: true,
  beforeEach() {
    sinon.spy(jQuery.fn, 'intlTelInput');
  },
  afterEach() {
    jQuery.fn.intlTelInput.restore();
  }
});

test('it renders', function (assert) {
  assert.expect(4);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');

  var element = component.$()[0];
  assert.equal(element.tagName.toLowerCase(), 'input');
  assert.equal(element.type.toLowerCase(), 'tel');
});

test('setupIntlTelInput', function (assert) {
  assert.expect(1);

  this.render();
  assert.ok(jQuery.fn.intlTelInput.called, 'intlTelInput called');
});

test('properties', function (assert) {
  assert.expect(1);

  var component = this.subject();
  component.setProperties({
    allowExtensions: 'allow extensions',
    autoFormat: 'auto format',
    autoHideDialCode: 'auto hide dial code',
    autoPlaceholder: 'auto placeholder',
    defaultCountry: 'us',
    geoIpLookup: 'geo ip lookup',
    nationalMode: 'national mode',
    numberType: 'MOBILE',
    onlyCountries: ['us'],
    preferredCountries: ['us']
  });

  this.render();

  assert.deepEqual({
    allowExtensions: 'allow extensions',
    autoFormat: 'auto format',
    autoHideDialCode: 'auto hide dial code',
    autoPlaceholder: 'auto placeholder',
    defaultCountry: 'us',
    geoIpLookup: 'geo ip lookup',
    nationalMode: 'national mode',
    numberType: 'MOBILE',
    onlyCountries: ['us'],
    preferredCountries: ['us']
  },
  jQuery.fn.intlTelInput.args[0][0],
  'intlTelInput called with arguments');
});
