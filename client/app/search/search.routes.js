'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('search', {
      url: '/search/:search',
      template: '<search></search>'
    });
}
