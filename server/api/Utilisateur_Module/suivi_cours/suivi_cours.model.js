'use strict';

import mongoose from 'mongoose';
import { registerEvents } from './suivi_cours.events';
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
var SuiviCoursSchema = new mongoose.Schema({
    _id: Number,
    publication: {
        type: Number,
        ref: 'Cours',
        ref: 'Exercice'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    date_suivie: Date
});

registerEvents(SuiviCoursSchema);
SuiviCoursSchema.plugin(autoIncrement.plugin, 'SuiviCours');
export default mongoose.model('SuiviCours', SuiviCoursSchema);