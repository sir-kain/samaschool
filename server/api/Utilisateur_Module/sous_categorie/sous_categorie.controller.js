/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sous_categories              ->  index
 * POST    /api/sous_categories              ->  create
 * GET     /api/sous_categories/:id          ->  show
 * PUT     /api/sous_categories/:id          ->  upsert
 * PATCH   /api/sous_categories/:id          ->  patch
 * DELETE  /api/sous_categories/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import SousCategorie from './sous_categorie.model';

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

// Gets a list of SousCategories
export function index(req, res) {
    return SousCategorie.find().populate('categorie').exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single SousCategorie from the DB
export function show(req, res) {
    return SousCategorie.findById(req.params.id).populate('categorie').exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

//gets all sousCategorie related to a categorie
export function getSousCatByCat(req, res) {
    return SousCategorie.find({ categorie: req.params.cat }).populate('categorie').exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Creates a new SousCategorie in the DB
export function create(req, res) {
    return SousCategorie.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given SousCategorie in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return SousCategorie.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing SousCategorie in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return SousCategorie.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a SousCategorie from the DB
export function destroy(req, res) {
    return SousCategorie.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}