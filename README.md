# SOLOMONS MVP v1

## 📋 Sobre o Projeto
SOLOMONS é uma plataforma de gerenciamento de redes de contatos com IA Generativa.

## 🎯 Guia Rápido de Execução

### 1. Iniciar Serviços Básicos
1. Abra o Docker Desktop
   - Aguarde o Docker iniciar completamente (ícone verde)

2. Abra o MongoDB Compass
   - Verifique se está conectado (indicador verde)

### 2. Preparar Ambiente de Desenvolvimento
1. Abra o VS Code
2. Abra o projeto
   - File > Open Folder
   - Selecione a pasta: solomons-mvp-v1

### 3. Executar o Projeto
1. No Terminal do VS Code (Ctrl + `): ```bash

### Instalar dependências (caso seja primeira vez)
cd frontend
npm install
cd ../backend
npm install

# Subir containers Docker
docker-compose up -d

# Iniciar Backend (em um terminal)
cd backend
npm run dev

# Iniciar Frontend (em outro terminal - Ctrl + Shift + `)
cd frontend
npm run dev

### 4. Acessar o Projeto
- Frontend: http://localhost:3000
- Backend: http://localhost:3333

### 5. Testar APIs (Postman)
1. Abra o Postman
2. Importe a collection (se disponível)
   - File > Import
   - Selecione: solomons-collection.json

### ❗ Problemas Comuns
1. **Erro de porta em uso** :```bash
   
# No terminal
npx kill-port 3000 3333

2. **Containers Docker não sobem**
   - Abra Docker Desktop
   - Clique em Restart

3. **Módulos não encontrados** :```bash npm install