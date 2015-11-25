import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('intl-tel-input', 'Integration | Component | intl-tel-input', {
  integration: true
});

test('rendering the component', function(assert) {
  assert.expect(1);
  this.set('phoneNumber', '12345556789');
  this.render(hbs`{{intl-tel-input value=phoneNumber}}`);
  assert.equal(this.$('input').val(), '1 234-555-6789');
});
