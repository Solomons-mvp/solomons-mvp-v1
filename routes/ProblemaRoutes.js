// Modelo com as rotas de Acesso para executar o CRUD - para contato

const express = require('express');
const router = express.Router();
const Problema = require('../models/Problema'); // Assumindo que você criou este modelo

// Criar um novo Problema
router.post('/', async (req, res) => {
    try {
        const newProblema = new Problema(req.body);
        const savedProblema = await newProblema.save();
        res.status(201).json(savedProblema);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todos os Problemas
router.get('/', async (req, res) => {
    try {
        const problemas = await Problema.find();
        res.status(200).json(problemas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar problemas' });
    }
});

// Buscar um Problema específico por ID
router.get('/:id', async (req, res) => {
    try {
        const problema = await Problema.findById(req.params.id);
        if (!problema) {
            return res.status(404).json({ message: 'Problema não encontrado' });
        }
        res.status(200).json(problema);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um Problema
router.put('/:id', async (req, res) => {
    try {
        const updatedProblema = await Problema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProblema) {
            return res.status(404).json({ message: 'Problema não encontrado' });
        }
        res.status(200).json(updatedProblema);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Excluir um Problema
router.delete('/:id', async (req, res) => {
    try {
        const deletedProblema = await Problema.findByIdAndDelete(req.params.id);
        if (!deletedProblema) {
            return res.status(404).json({ message: 'Problema não encontrado' });
        }
        res.status(200).json({ message: 'Problema deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;