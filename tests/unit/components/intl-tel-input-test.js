import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('intl-tel-input', 'Unit | Component | intl tel input', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {
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
