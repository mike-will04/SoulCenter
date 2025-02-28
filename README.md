# 📌 SoulCenter

Desenvolvi um site para catalogar jogos de RPG e MMORPG, com o objetivo de organizar e apresentar informações detalhadas sobre os jogos disponíveis.

## 📋 Índice

- [📌 Nome do Projeto](#-nome-do-projeto)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📖 Funcionalidades](#-funcionalidades)
- [⚙️ Instalação e Configuração](#%EF%B8%8F-instalação-e-configuração)
- [📸 Demonstração](#-demonstração)
- [📑 Documentação](#-documentação)
- [📄 Licença](#-licença)

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- Node.js
- SQL
- HTML
- CSS
- Bootstrap
- Figma (para prototipação)

### 📦 Dependências utilizadas:

- express
- mysql
- body-parser
- multer
- path
- bcrypt
- express-session

## 📖 Funcionalidades

- ✅ **Cadastro de Usuários** – Permite que novos usuários se cadastrem com nome, e-mail e senha, garantindo que não haja duplicações no banco de dados.
- ✅ **Login de Usuários** – Autenticação de usuários cadastrados por meio de nome/e-mail e senha.
- ✅ **Biblioteca de Jogos** – Página onde os usuários podem visualizar jogos cadastrados, com detalhes como nome, gênero, data de lançamento e um resumo.
- ✅ **Pesquisa de Jogos** – Campo de busca para encontrar jogos filtrando por nome, gênero, data de lançamento ou resumo.
- ✅ **Cadastro de Jogos** – Formulário para usuários cadastrarem novos jogos na plataforma, incluindo nome, gênero, data de lançamento, resumo e imagem.
- ✅ **Gerenciamento de Jogos para Administradores** – Administradores possuem acesso a funcionalidades exclusivas para:
  - **Alterar jogos cadastrados** – Permite a edição das informações de um jogo já registrado.
  - **Excluir jogos cadastrados** – Remove um jogo da biblioteca.
- ✅ **Sessão de Usuário** – Gerenciamento de sessões utilizando `express-session`, garantindo autenticação segura e controle de login/logout.
- ✅ **Criptografia de Senhas** – As senhas dos usuários são armazenadas de forma segura no banco de dados utilizando `bcrypt`.
- ✅ **Upload de Imagens** – Implementação do `multer` para permitir o envio de imagens no cadastro de jogos.
- ✅ **Middleware de Segurança e Validação** – Uso de middlewares para processar e validar requisições de usuários e administradores.

## ⚙️ Instalação e Configuração

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

- Node.js
- MySQL
- Navegador atualizado

### Passos para instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd nome-do-repositorio
   ```
3. Instale as dependências do projeto:
   ```sh
   npm install [dependêcia]
   ```
4. Configure o banco de dados importando o arquivo `banconode.sql`.
5. Execute o arquivo `app.js`:
   ```sh
   node app.js
   ```
7. Acesse o projeto no navegador em `http://localhost:3000`.

## 📸 Demonstração

![soulcenter](https://github.com/user-attachments/assets/05c0607a-43ab-4227-a6dc-2a4b97d8c541)

## 📑 Documentação

Você pode acessar a documentação completa [aqui](./Documentação de Telas e Códigos.pdf).

## 📄 Licença

Este projeto está licenciado sob a **CC BY-NC-ND 4.0**. Isso significa que ele **não pode ser modificado nem usado comercialmente**.



