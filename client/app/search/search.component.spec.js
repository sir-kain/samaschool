'use strict';

describe('Component: SearchComponent', function() {
  // load the controller's module
  beforeEach(module('samaschoolApp.search'));

  var SearchComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SearchComponent = $componentController('search', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
