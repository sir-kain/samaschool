'use strict';

import mongoose from 'mongoose';
import { registerEvents } from './cours.events';
import ParentModele from '../publication/publication.model';
var extend = require('mongoose-schema-extend');
var PublicationSchema = ParentModele.Modele();
var CoursSchema = PublicationSchema.extend({
    nbheures: Number,
    images: String,
    actif: Boolean,
    link: String,
    contenu: String
});

registerEvents(CoursSchema);
export default mongoose.model('Cours', CoursSchema);