/**
 * Arquivo Principal da Aplicação SOLOMONS
 * 
 * Este arquivo configura e inicia o servidor Express, conecta ao banco de dados,
 * e define as rotas principais da aplicação.
 */

// Importação de dependências
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Importação de rotas
const contatoRoutes = require('./routes/ContatoRoutes');
const problemaRoutes = require('./routes/ProblemaRoutes'); // Nova importação

// Configuração das variáveis de ambiente
dotenv.config();

// Conexão com o banco de dados
connectDB();

// Inicialização da aplicação Express
const app = express();

// Configuração de middlewares
app.use(cors()); // Habilita CORS para todas as rotas
app.use(bodyParser.json()); // Parse do corpo das requisições como JSON

// Definição das rotas da API
app.use('/api/contatos', contatoRoutes);
app.use('/api/problemas', problemaRoutes); // Nova rota para problemas

// Rota padrão para verificar se o servidor está rodando
app.get('/', (req, res) => {
    res.send('Servidor SOLOMONS está rodando');
});

// Configuração da porta do servidor
const PORT = process.env.PORT || 3000;

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor SOLOMONS rodando na porta ${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'desenvolvimento'}`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
    console.log('ERRO NÃO TRATADO! 💥 Encerrando...');
    console.error(err.name, err.message);
    process.exit(1);
});