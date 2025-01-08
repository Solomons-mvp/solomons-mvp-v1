// Modelo com as rotas de Acesso para executar o CRUD - para contato

const express = require('express');
const router = express.Router();
const Contato = require('../models/Contato');

// Criar um novo Contato
router.post('/', async (req, res) => {
    try {
        const newContato = new Contato(req.body);
        const savedContato = await newContato.save();
        res.status(201).json(savedContato);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Listar todos os itens
router.get('/', async (req, res) => {
    try {
        const Contatos = await Contato.find();
        res.status(200).json(Contatos);
    } catch (err) {
        console.log(err);
        
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um Contato
router.put('/:id', async (req, res) => {
    try {
        const updatedContato = await Contato.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedContato);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Excluir um Contato
router.delete('/:id', async (req, res) => {
    try {
        await Contato.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Contato deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
