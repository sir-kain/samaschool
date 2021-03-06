'use strict';
const angular = require('angular');

/*@ngInject*/
export function souscategorieProviderService($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.listSousCategorie = function() {
        var deferred = $q.defer();
        var liste = [];
        $http.get('/api/sous_categories', {
            cache: true
        }).then(function(list) {
            liste = list.data;
            deferred.resolve(liste);

        });
        liste = deferred.promise;

        return liste;

    }
    this.getSousCatByCategorie = function(souscat) {
        var deferred = $q.defer();
        var liste = [];
        $http.get('/api/sous_categories/cat/' + souscat, {
            cache: true
        }).then(function(list) {
            liste = list.data;
            deferred.resolve(liste);

        });
        liste = deferred.promise;
        return liste;

    }
    this.getSousCatById = function(id) {
        var deferred = $q.defer();
        var liste = [];
        $http.get('/api/sous_categories/' + id, {
            cache: true
        }).then(function(list) {
            liste = list.data;
            deferred.resolve(liste);

        });
        liste = deferred.promise;
        return liste;

    }
}

export default angular.module('samaschoolApp.souscategorieProvider', [])
    .service('souscategorieProvider', souscategorieProviderService)
    .name;