const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    telefone: {
        type: String,
        required: false,
    },
    area_atuacao: {
        type: String,
        required: false,
    },
    nivel_confianca: {
        type: Number,
        required: false,
    },
    habilidades: {
        type: Array,
        required: false
    },
    recursos: {
        type: Array,
        required: false,
    }
});

module.exports = mongoose.model('Contato', ContatoSchema);
