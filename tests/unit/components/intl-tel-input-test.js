import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import Ember from 'ember';

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

test('it syncs the component value to the input value', function (assert) {
  assert.expect(3);

  var component = this.subject();
  this.render();

  Ember.run(() => {
    component.set('value', 'old value');
  });

  var el = component.$();

  assert.equal(el.val(), 'old value');

  Ember.run(() => {
    el.val('new value');
    el.change();
  });

  return wait().then(() => {
    assert.equal(el.val(), 'new value');
    assert.equal(component.get('value'), 'new value');
  });
});

test('isValidNumber', function (assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('value', '12065555555');
  this.render();

  assert.ok(component.get('isValidNumber'), 'isValidNumber');
});

test('selectedCountryData', function (assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('onlyCountries', ['us']);
  component.set('defaultCountry', 'us');
  this.render();

  assert.deepEqual(component.get('selectedCountryData'), {
    'areaCodes': null,
    'dialCode': '1',
    'iso2': 'us',
    'name': 'United States',
    'priority': 0
  });
});

test('extension', function (assert) {
  assert.expect(1);

  var component = this.subject();
  component.set('numberFormat', 'E14');
  component.set('value', '+12065555555 ext. 12345');
  this.render();

  assert.equal(component.get('extension'), '12345');
});
