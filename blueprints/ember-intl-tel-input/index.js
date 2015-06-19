module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('intl-tel-input', '25b9f387bc616ca8f432defb35b918d45ab79432');
  }
};
