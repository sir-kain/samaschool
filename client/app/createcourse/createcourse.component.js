'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './createcourse.routes';

export class CreatecourseComponent {
    /*@ngInject*/
    jsFonctions;
    souscategorieProvider;
    listSousCat;
    categorieProvider;
    listCat;
    coursProvider;
    listClass;
    classeProvider;
    firstPart = true;
    secondPart = false;
    thirdPart = false;
    fourthPart = false;
    selectedCount = 0;
    stateProgress = 0;
    LIs = [];
    obj = {};
    elementCard = [];
    listChap = [];
    objetCours = {};
    listSouscatBycat;
    titreChap = [];
    objChap = {};
    getcurrentUser;
    currentdate = new Date();
    datetime;
    activite;
    etabProf;
    categ = {
        id: "",
        libelle: ""
    };
    sCateg = {
        id: "",
        libelle: ""
    };
    listClasseUser;
    listClasseUsers = [];
    constructor(jsFonctions, categorieProvider, souscategorieProvider, coursProvider, Auth, classeProvider) {
        this.jsFonctions = jsFonctions;
        this.categorieProvider = categorieProvider;
        this.souscategorieProvider = souscategorieProvider;
        this.coursProvider = coursProvider;
        this.classeProvider = classeProvider;
        this.message = 'Hello';
        this.firstPart = true;
        this.directpublish = false;
        this.getcurrentUser = Auth.getCurrentUserSync;
        this.datetime = this.currentdate.getFullYear() + "-" + (this.currentdate.getMonth() + 1) + "-" + this.currentdate.getDate();
        this.categ.id = "";
        this.categ.libelle = "selectionner le domaine";
        this.sCateg.id = "";
        this.sCateg.libelle = "selectionner le sous domaine";
    }
    getSousCatByCategorie(id) {
        this.souscategorieProvider.getSousCatByCategorie(id).then(list => {
            this.listSouscatBycat = list;
            console.log('Les Sous Catégories de la Categorie', this.listSouscatBycat);
        });
    }

    $onInit() {
        angular.element(document)
            .ready(() => {
                setTimeout(() => {
                    this.jsFonctions.pluginScript();
                    this.jsFonctions.otherScript();
                    //   this.getClasseByUser(this.getcurrentUser()._id);
                }, 0);
            });
        this.noPlan = false;
        this.categorieProvider.listCategorie().then(list => {
            this.listCat = list;
            if (this.listCat.length == 0) {
                console.log('Liste Vide');
            } else {
                console.log('Les Categories', this.listCat);
                // for (let i = 0; i < this.listCat.length; i++) {
                //   this.getSousCatByCategorie(this.listCat[i]._id);
                // }
                // $log.info('les cat ', this.listCat);
            }
        });
        this.souscategorieProvider.listSousCategorie().then(list => {
            this.listSousCat = list;
            if (this.listSousCat.length == 0) {
                console.log('Liste Vide');
            } else {
                // console.log('Les  cat', this.listSousCat);
                console.info('les Sous catégories ', this.listSousCat);
                // $log.info('les sous cat ', this.listSousCat);
            }
        });
    }
    nextClick() {
        console.log('User bi', this.getcurrentUser());
        if (this.titreChap && this.objectifChap && this.contenuChap && !this.numberError && this.stateProgress == 50 && this.firstPart != true && this.secondPart != true && this.nbChap) {
            console.log('next next');
            this.firstPart = false;
            this.secondPart = false;
            this.thirdPart = false;
            this.fourthPart = true;
            this.stateProgress = 75;
            this.styleProgress = {
                'width': `${this.stateProgress}%`,
                'visibility': 'visible',
                'animation-name': 'slideInLeft'
            }
            console.info(this.nbChap);
            this.objetCours.nbChap = this.nbChap;
            for (let c = 0; c < this.nbChap; c++) {
                this.titrech = this.titreChap[c];
                this.objectifch = this.objectifChap[c];
                this.contenuch = this.contenuChap[c];
                this.lienVideoch = this.lienVideoChap[c];
                this.objChap[`${c}`] = {
                    'titre': this.titrech,
                    'objectif': this.objectifch,
                    'contenu': this.contenuch,
                    'lienVideo': this.lienVideoch,
                };
            }
            this.objetCours.objChap = this.objChap;
            console.log('le cours ', this.objetCours);
            this.coursProvider.objetCours.tab = this.objetCours.objChap;
            this.coursProvider.objetCours.taille = this.nbChap;
        }
        if (this.urlvideo != "" && this.stateProgress == 50 && !this.firstPart && !this.secondPart && this.directpublish) {
            this.firstPart = false;
            this.secondPart = false;
            this.thirdPart = false;
            this.fourthPart = true;
            this.stateProgress = 75;
            this.styleProgress = {
                'width': `${this.stateProgress}%`,
                'visibility': 'visible',
                'animation-name': 'slideInLeft'
            }
            this.objetCours.detailscours = {
                'titrecours': this.titreCours,
                'objectifcours': this.objectifCours,
                'heure': this.nbh,
                'lien': this.urlvideo
            };
            console.log('le cours ', this.objetCours);
        }
        if (this.titreCours && this.objectifCours && !this.numberError && this.titreCours.length >= 3 && this.objectifCours.length >= 5 && this.stateProgress == 25 && this.firstPart != true) {
            console.log('next next');
            this.firstPart = false;
            this.secondPart = false;
            this.thirdPart = true;
            this.fourthPart = false;
            this.stateProgress = 50;
            this.styleProgress = {
                'width': `${this.stateProgress}%`,
                'visibility': 'visible',
                'animation-name': 'slideInLeft'
            }
            this.objetCours.detailscours = {
                'titrecours': this.titreCours,
                'objectifcours': this.objectifCours,
                'heure': this.nbh
            };
            console.log('le cours ', this.objetCours);
            this.coursProvider.objetCours.titre = this.objetCours.detailscours.titrecours;
            this.coursProvider.objetCours.description = this.objetCours.detailscours.objectifcours;
            this.coursProvider.objetCours.nbheures = this.objetCours.detailscours.heure;
        }
        if (this.selectedIdsCat && this.stateProgress === 0) {
            this.firstPart = false;
            this.secondPart = true;
            this.thirdPart = false;
            this.fourthPart = false;
            this.stateProgress = 25;
            this.styleProgress = {
                'width': `${this.stateProgress}%`,
                'visibility': 'visible',
                'animation-name': 'slideInLeft'
            }
            this.objetCours.sousCategorie = this.sCateg.id;
            console.log(this.objetCours.sousCategorie);
            this.coursProvider.objetCours.sous_cat = this.objetCours.sousCategorie;
        } else {
            console.log('cant go next');
        }

    }
    prevClick() {
        if (this.stateProgress === 25) {
            this.firstPart = true;
            this.thirdPart = false;
            this.secondPart = false;
            this.fourthPart = false;
            this.stateProgress = 0;
            this.styleProgress = {
                'width': `${this.stateProgress}%`,
                'visibility': 'visible',
                'animation-name': 'slideInLeft'
            }
            this.selectedCount = 1;
            return;
        }
        if (this.stateProgress === 50) {
            this.firstPart = false;
            this.thirdPart = false;
            this.secondPart = true;
            this.fourthPart = false;
            this.stateProgress = 25;
            this.styleProgress = {
                'width': `${this.stateProgress}%`,
                'visibility': 'visible',
                'animation-name': 'slideInLeft'
            }
            return;
        }
        if (this.stateProgress === 75) {
            this.firstPart = false;
            this.thirdPart = true;
            this.secondPart = false;
            this.fourthPart = false;
            this.stateProgress = 50;
            this.styleProgress = {
                'width': `${this.stateProgress}%`,
                'visibility': 'visible',
                'animation-name': 'slideInLeft'
            }
            return;
        }

    }
    addCour() {

        /* this.coursProvider.ajoutcours2(this.objetCours.detailscours.titrecours, this.objetCours.detailscours.objectifcours, this.datetime, this.objetCours.sousCategorie, this.getcurrentUser()._id, this.objetCours.detailscours.heure, this.objetCours.objChap, this.nbChap, this.activite);*/
        //  window.location.reload();
    }
    addBrouillon() {
        console.log('Date bi', this.datetime);
        this.activite = false;
        this.coursProvider.ajoutCours2(this.objetCours.detailscours.titrecours, this.objetCours.detailscours.objectifcours, this.datetime, this.objetCours.sousCategorie, this.getcurrentUser()._id, this.objetCours.detailscours.heure, this.objetCours.objChap, this.nbChap, this.activite);
    }
    verifyNumber() {
        if (this.nbh) {
            if (this.nbh < 1 || this.nbh > 99) {
                this.numberError = true;
            } else {
                this.numberError = false;
            }
        }
    }
    verifyNumberChap() {
        if (this.nbChap) {
            if (this.nbChap < 1 || this.nbChap > 20) {
                this.numberChapError = true;
            } else {
                this.numberChapError = false;
            }
        }
    }
    GenerateFields() {
        this.noPlan = false;
        if (this.nbChap == 0) {
            this.listChap = [];
            this.noPlan = true;
        } else if (this.nbChap < 0 || this.nbChap > 10) {
            this.listChap = [];
            this.numberChapError = true;
        } else {
            this.noPlan = false;
            this.numberChapError = false;
            this.listChap = [];
            for (let i = 0; i < this.nbChap; i++) {
                this.listChap.push(i);
                console.log(this.listChap)
            }
        }
    }
    delChap(indexTab) {
        this.listChap.splice(indexTab, 1);
        console.log(this.listChap)
    }
    publish() {
        this.coursProvider.createdCourse = this.objetCours;
        console.log('course added !!!')
    }
    directPublish() {
            this.directpublish = true;
        }
        // pour dropdown des Categories
    selectedCateg(categorie) {
        console.log(categorie)
        console.log(this.categ)
        this.sCateg.id = "";
        this.sCateg.libelle = "selectionner le sous domaine";
        this.selectedIdsCat = false;
        this.categ.id = categorie._id;
        this.categ.libelle = categorie.libelle;
        this.selectedId = true;
        console.log(this.categ)
        this.getSousCatByCategorie(this.categ.id);
    }
    selectedSCateg(sousCategorie) {
        this.sCateg.id = sousCategorie._id;
        this.sCateg.libelle = sousCategorie.libelle;
        this.selectedIdsCat = true;
    }
}
export function ModalDemoCtrl($uibModal, $log, $document) {
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

    $ctrl.animationsEnabled = true;

    $ctrl.open = function(size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function() {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $ctrl.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}
export function ModalInstanceCtrl($uibModalInstance, items, userProvider, classeProvider, Auth, coursProvider) {
    var $ctrl = this;
    $ctrl.items = items;
    $ctrl.selected = {
        item: $ctrl.items[0]
    };
    userProvider.varbi = $uibModalInstance;
    //   pour les classes du prof
    $ctrl.currentdate = new Date();
    $ctrl.listClasseUser;
    $ctrl.listClasseUsers = [];
    $ctrl.selectedClass = [];
    $ctrl.getcurrentUser = Auth.getCurrentUserSync;
    $ctrl.datetime = $ctrl.currentdate.getFullYear() + "-" + ($ctrl.currentdate.getMonth() + 1) + "-" + $ctrl.currentdate.getDate();
    $ctrl.activite = true;
    coursProvider.objetCours.date = $ctrl.datetime;
    coursProvider.objetCours.user = $ctrl.getcurrentUser()._id;
    coursProvider.objetCours.act = $ctrl.activite;
    $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.selected.item);
        // console.log('idsss', $ctrl.selectedClass);
        coursProvider.ajoutCours2(coursProvider.objetCours.titre, coursProvider.objetCours.description, coursProvider.objetCours.date, coursProvider.objetCours.sous_cat, $ctrl.getcurrentUser._id, coursProvider.objetCours.nbheures, coursProvider.objetCours.tab, coursProvider.objetCours.taille, $ctrl.activite, $ctrl.selectedClass);
        console.log('khol li', coursProvider.objetCours);
    };

    $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $ctrl.verify = function(tab, element) {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i]._id == element) {
                return true;
            }
        }
        return false;
    }

    $ctrl.verif = function(tab, element) {
        if (tab._id == element) {
            return true;
        }
        return false;
    }

    $ctrl.getClasseByUser = function(user) {
            console.log('etape 1')
            console.log(user)
            classeProvider.getClasseByUser(user).then(list => {
                console.log('etape 2')
                $ctrl.listClasseUser = list;
                if ($ctrl.listClasseUser.length == 0) {
                    console.log('Liste Vide');
                } else {
                    console.log('Les Classes du prof', $ctrl.listClasseUser);
                }
                for (let i = 0; i < $ctrl.listClasseUser.length; i++) {
                    for (let j = 0; j < $ctrl.listClasseUser[i].length; j++) {
                        if ($ctrl.listClasseUsers.length == 0) {
                            $ctrl.listClasseUsers.push($ctrl.listClasseUser[i][j].etablissement);
                        } else {
                            if (!$ctrl.verify($ctrl.listClasseUsers, $ctrl.listClasseUser[i][j].etablissement._id)) {
                                $ctrl.listClasseUsers.push($ctrl.listClasseUser[i][j].etablissement);
                            }
                        }
                    }
                }
                var l;
                for (let k = 0; k < $ctrl.listClasseUsers.length; k++) {
                    l = 0;
                    var userClass = {};
                    for (let i = 0; i < $ctrl.listClasseUser.length; i++) {
                        for (let j = 0; j < $ctrl.listClasseUser[i].length; j++) {
                            if ($ctrl.verif($ctrl.listClasseUsers[k], $ctrl.listClasseUser[i][j].etablissement._id)) {
                                userClass[`${l}`] = $ctrl.listClasseUser[i][j].classe;
                                l++;
                            }
                        }
                    }
                    $ctrl.listClasseUsers[k].classe = userClass;
                }
                console.log('Les Classes du profss', $ctrl.listClasseUsers);
            });
        }
        //   $ctrl.check = function(id) {
        //     consol
        //   }

    console.error($ctrl.selectedClass)
}

CreatecourseComponent.$inject = ["jsFonctions", "categorieProvider", "souscategorieProvider", "coursProvider", "Auth", "classeProvider"];
ModalDemoCtrl.$inject = ["$uibModal", "$log", "$document"];
ModalInstanceCtrl.$inject = ["$uibModalInstance", "items", "userProvider", "classeProvider", "Auth", "coursProvider"];

export default angular.module('samaschoolApp.createcourse', [uiRouter])
    .config(routes)
    .component('createcourse', {
        template: require('./createcourse.html'),
        controller: CreatecourseComponent,
        controllerAs: 'createcourseCtrl'
    })
    .controller('ModalDemoCtrl', ModalDemoCtrl)
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .component('modalComponent', {
        templateUrl: 'myModalContent.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: function() {
            var $ctrl = this;

            $ctrl.$onInit = function() {
                $ctrl.items = $ctrl.resolve.items;
                $ctrl.selected = {
                    item: $ctrl.items[0]
                };
            };

            $ctrl.ok = function() {
                $ctrl.close({
                    $value: $ctrl.selected.item
                });
            };

            $ctrl.cancel = function() {
                $ctrl.dismiss({
                    $value: 'cancel'
                });
            };
        }
    })
    .filter('trustAsResourceUrl', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }])
    .name;