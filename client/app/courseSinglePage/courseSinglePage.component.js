'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './courseSinglePage.routes';

export class CourseSinglePageComponent {
  jsFonctions;
  coursProvider;
  $stateParams;
  souscategorieProvider;
  chapitreProvider;
  userProvider;
  LesChapitres = [];
  /*@ngInject*/
  constructor(jsFonctions, coursProvider, $stateParams, souscategorieProvider, chapitreProvider, userProvider) {
    // setTimeout(() => {
    this.$stateParams = $stateParams;
    this.userProvider = userProvider;
    console.log('params =>', this.$stateParams);
    // }, 50);
    this.message = 'Hello';
    this.jsFonctions = jsFonctions;
    this.coursProvider = coursProvider;
    this.souscategorieProvider = souscategorieProvider;
    this.chapitreProvider = chapitreProvider;
  }
  $onInit() {
    angular.element(document)
      .ready(() => {
        setTimeout(() => {
          this.jsFonctions.pluginScript();
          this.jsFonctions.otherScript();
        }, 0);
      });
    this.souscategorieProvider.getSousCatById(this.$stateParams.sousDomaine).then(list => {
      this.souscat = list;
      console.log('La Sous Catégorie', this.souscat);
    });
    // Recuperation du cours en passant l'url
    this.coursProvider.FindById(this.$stateParams.idCours).then(list => {
      this.LeCours = list;
      console.log('objet cours =>>', this.LeCours);
      // si le cours a des chapitres
      if (!this.LeCours.contenu) {
        // Recuperation des chapitres en passant l'url
        this.chapitreProvider.getChapitreByCours(this.$stateParams.idCours).then(list => {
          this.LesChapitres = list;
            console.info('les chapitre du cours =>>', this.LesChapitres, 'et nombre ', this.LesChapitres.length);
            // si un chapitre est choisi
            // recherche du chapitre choisi
            if(this.$stateParams.idChap){
              this.LesChapitres.map((chapitre) => {
                if(chapitre._id == this.$stateParams.idChap){
                  this.LeChapitre = chapitre;
                  console.log('le chapitre ===>>> ', this.LeChapitre);

                  // recuperation du contenu du chapitre
                  this.chapitreProvider.getFichierByChapitre(chapitre._id).then(list => {
                    this.LeContenuDuChapitre = list[0];
                    console.info('le contenu du chapitre du cours =>>', this.LeContenuDuChapitre);
                    this.LeChapitre.contenuChap = this.LeContenuDuChapitre;
                  });
                }
              });
            }
        });
      }
      this.userProvider.findById(this.LeCours.user).then(list => {
        this.Leprof = list;
        console.log('Le prof qui a cree le cours =>>', this.Leprof);
      });
    });

  }
}

CourseSinglePageComponent.$inject = ["jsFonctions", "coursProvider", "$stateParams", "souscategorieProvider", "chapitreProvider", "userProvider"];
export default angular.module('samaschoolApp.courseSinglePage', [uiRouter])
  .config(routes)
  .component('courseSinglePage', {
    template: require('./courseSinglePage.html'),
    controller: CourseSinglePageComponent,
    controllerAs: 'courseCtrl'
  })
  .name;
