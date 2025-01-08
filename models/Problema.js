const mongoose = require('mongoose');

const ProblemaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pendente', 'Em Análise', 'Resolvido', 'Arquivado'],
        default: 'Pendente'
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    habilidadesNecessarias: {
        type: [String],
        required: false
    },
    recursosRequeridos: {
        type: [String],
        required: false
    },
    dataUltimaAnalise: {
        type: Date,
        default: null
    }
}, {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

// Índice para melhorar a performance de consultas
ProblemaSchema.index({ status: 1, dataCriacao: -1 });

module.exports = mongoose.model('Problema', ProblemaSchema);