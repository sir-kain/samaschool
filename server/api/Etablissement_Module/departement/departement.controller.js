/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/departements              ->  index
 * POST    /api/departements              ->  create
 * GET     /api/departements/:id          ->  show
 * PUT     /api/departements/:id          ->  upsert
 * PATCH   /api/departements/:id          ->  patch
 * DELETE  /api/departements/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Departement from './departement.model';
import Detail from '../detail_cycle/detail_cycle.model';
import Faculte from '../faculte/faculte.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch (err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Departements
export function index(req, res) {
    return Departement.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Departement from the DB
export function show(req, res) {
    return Departement.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets departement by faculte
export function getAllDepartementbyFaculte(req, res) {
    return Departement.find({ faculte: req.params.id }).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}
//GEt Departement by Etab
export function getAllDepartementbyEtab(req, res) {
    var tab = [];
    var tabs = [];
    var tabbi = [];
    Detail.find({ etablissement: req.params.id }).exec().then(list => {
        list.forEach(function(element) {
            tab.push(element._id);
        });
        for (let i = 0; i < tab.length; i++) {
            Faculte.find({ cycle: tab[i] }).exec().then(fac => {
                fac.forEach(function(e) {
                    tabs.push(e._id);
                });
                var cpt = 0;
                for (let j = 0; j < tabs.length; j++) {
                    Departement.find({ faculte: tabs[j] }).exec().then(dep => {
                        tabbi.push(dep);
                        cpt++;
                        if (cpt == tabs.length) {
                            return res.json(tabbi);
                        }
                    });
                }
            });

        }
    });
}
// Creates a new Departement in the DB
export function create(req, res) {
    return Departement.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Departement in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Departement.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Departement in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Departement.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Departement from the DB
export function destroy(req, res) {
    return Departement.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}