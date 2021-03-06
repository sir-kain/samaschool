/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/detail_classes              ->  index
 * POST    /api/detail_classes              ->  create
 * GET     /api/detail_classes/:id          ->  show
 * PUT     /api/detail_classes/:id          ->  upsert
 * PATCH   /api/detail_classes/:id          ->  patch
 * DELETE  /api/detail_classes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import DetailClasse from './detail_classe.model';

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

// Gets a list of DetailClasses
export function index(req, res) {
    return DetailClasse.find().populate('classe').populate('etablissement').exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getClasseByEtablissement(req, res) {
    DetailClasse.find({ etablissement: req.params.id }).populate('classe').exec()
        .then(list => {
            var us = [];
            list.forEach(function(element) {
                us.push(element.classe);
            });
            return res.json(us);
        })

}

// Gets a single DetailClasse from the DB
export function show(req, res) {
    return DetailClasse.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets etablissement by classe
export function getEtabByClasse(req, res) {
   DetailClasse.find({ classe: req.params.cl }).populate('etablissement').exec()
        .then(list => {
            var us = [];
            list.forEach(function(element) {
                us.push(element.etablissement);
            });
            return res.json(us);
        })
}


// Creates a new DetailClasse in the DB
export function create(req, res) {
    return DetailClasse.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given DetailClasse in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return DetailClasse.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing DetailClasse in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return DetailClasse.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a DetailClasse from the DB
export function destroy(req, res) {
    return DetailClasse.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}