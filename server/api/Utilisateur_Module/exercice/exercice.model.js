'use strict';

import mongoose from 'mongoose';
import { registerEvents } from './exercice.events';
import ParentModele from '../publication/publication.model';
var extend = require('mongoose-schema-extend');
var PublicationSchema = ParentModele.Modele();
var ExerciceSchema = PublicationSchema.extend({
    document: String,
    cours: {
        type: Number,
        ref: 'Cours',
        ref: 'Chapitre'
    }
});

registerEvents(ExerciceSchema);
export default mongoose.model('Exercice', ExerciceSchema);