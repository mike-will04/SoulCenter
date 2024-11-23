const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
//Não se esquecer de dar npm install em todas as dependências acima

const app = express();

app.use(session({
  secret: 'ChaveDeSeguranca',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


// Rota para o menu
app.get('/', (req, res) => {
  const user = req.session.user; // Verifica se há um usuário logado na sessão

  const menu = user
    ? `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro">Cadastrar Jogo</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/logout">Sair da Conta</a>
      </li>
    `
    : `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro_usuario">Cadastrar Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/login">Login Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
    `;

  // Renderiza a página principal com o menu correto
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">

    <head>
      <title>SoulCenter</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      <link rel="shortcut icon" href="../uploads/img/lobo.png" type="image/x-icon">
      <link rel="stylesheet" href="uploads/css/style.css">
    </head>

    <body class="d-flex flex-column min-vh-100">
      <nav class="navbar navbar-expand-sm" style="background-color: black;">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><img src="../uploads/img/logosite.png" alt="Logo" height="50px"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul class="navbar-nav">
              ${menu}
            </ul>
          </div>
        </div>
      </nav>

      <main class="flex-grow-1">
        <!-- Carousel -->
  <div id="demo" class="carousel slide" data-bs-ride="carousel">

    <!-- Indicators/dots -->
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
    </div>

    <!-- The slideshow/carousel -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../uploads/img/mmorpg.png" alt="mmorpg" class="d-block">
      </div>
      <div class="carousel-item">
        <img src="../uploads/img/rpg.png" alt="RPG" class="d-block">
      </div>
    </div>

    <!-- Left and right controls/icons -->
    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>

  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col-5">
        <img src="../uploads/img/lobo.png" alt="Lobo" class="img-fluid" width="400" height="400">
      </div>
      <div class="col-6">
        <p style="text-align: justify;">
          <h5>Bem-vindo ao nosso portal de RPG e MMORPG!</h5>
          Aqui, você encontrará um espaço dedicado aos apaixonados por mundos fantásticos, onde a imaginação não tem
          limites. Nosso objetivo é oferecer conteúdo sobre RPGs e MMORPGs, mostrando um pouco sobre os games favoritos
          da comunidade.
          Explore nossas seções de cadastro e pesquisa de jogos e prepare-se para mergulhar em histórias épicas e
          descobrir novos mundos.
          Entre e aventure-se conosco!
        </p>
      </div>
    </div>
  </div>
      </main>

      <footer class="p-4 fixed-botton text-center text-light" style="background-color: black;">
        Site desenvolvido por: <br>
        Arthur, Felipe, Gabriel e Mike Will <br>
        3B <br>
        © 2024 SoulCenter - Todos direitos reservados.
      </footer>
    </body>

    </html>
  `);
});


// Rota para o html do cadastro de usuário
app.get('/cadastro_usuario', (req, res) => {
  const user = req.session.user; // Verifica se há um usuário logado na sessão

  const menu = user
    ? `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro">Cadastrar Jogo</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/logout">Sair da Conta</a>
      </li>
    `
    : `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro_usuario">Cadastrar Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/login">Login Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
    `;

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">

    <head>
      <title>SoulCenter</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      <link rel="shortcut icon" href="../uploads/img/lobo.png" type="image/x-icon">
      <link rel="stylesheet" href="uploads/css/style.css">
    </head>

    <body class="d-flex flex-column min-vh-100">
      <nav class="navbar navbar-expand-sm" style="background-color: black;">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><img src="../uploads/img/logosite.png" alt="Logo" height="50px"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul class="navbar-nav">
              ${menu}
            </ul>
          </div>
        </div>
      </nav>

      <main class="flex-grow-1">
    <div class="container-fluid mb-4">
        <div class="row p-3">
            <div class="col-12 text-center">
                <h1 style="font-weight: bold;">Cadastrar Usuário</h1>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-5 p-3" style="border: 5px solid #9C9C9C; border-radius: 20px;">
                <form action="/usuario_add" method="post">
                    <div class="row">
                        <div class="form-group col-md-12">
                            <h5>
                                <label for="usuario" class="form-label">Usuário:</label>
                            </h5>
                            <input type="text" class="form-control" placeholder="Usuário" name="usuario" required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <h5>
                                <label for="email" class="form-label">Email:</label>
                            </h5>
                            <input type="email" class="form-control" placeholder="Email" name="email" required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <h5>
                                <label for="senha" class="form-label">Senha:</label>
                            </h5>
                            <input type="password" class="form-control" placeholder="Senha" name="senha"
                                required>
                        </div>
                    </div>
                    <br>
                    <div class="row ">
                        <div class="col-12 d-flex justify-content-center">
                            <input type="submit" class="btn btn-primary" value="Cadastrar">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>

      <footer class="p-4 fixed-botton text-center text-light" style="background-color: black;">
        Site desenvolvido por: <br>
        Arthur, Felipe, Gabriel e Mike Will <br>
        3B <br>
        © 2024 SoulCenter - Todos direitos reservados.
      </footer>
    </body>

    </html>
  `);
});


// Rota para o html do login do usuário
app.get('/login', (req, res) => {
  const user = req.session.user; // Verifica se há um usuário logado na sessão

  const menu = user
    ? `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro">Cadastrar Jogo</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/logout">Sair da Conta</a>
      </li>
    `
    : `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro_usuario">Cadastrar Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/login">Login Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
    `;

  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">

    <head>
      <title>SoulCenter</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      <link rel="shortcut icon" href="../uploads/img/lobo.png" type="image/x-icon">
      <link rel="stylesheet" href="uploads/css/style.css">
    </head>

    <body class="d-flex flex-column min-vh-100">
      <nav class="navbar navbar-expand-sm" style="background-color: black;">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><img src="../uploads/img/logosite.png" alt="Logo" height="50px"></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul class="navbar-nav">
              ${menu}
            </ul>
          </div>
        </div>
      </nav>

      <main class="flex-grow-1">
    <div class="container-fluid mb-4">
        <div class="row p-3">
            <div class="col-12 text-center">
                <h1 style="font-weight: bold;">Login Usuário</h1>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-5 p-3" style="border: 5px solid #9C9C9C; border-radius: 20px;">
                <form action="/login" method="post">
                    <div class="row">
                        <div class="form-group col-md-12">
                            <h5>
                                <label for="usuario" class="form-label">Usuário ou Email:</label>
                            </h5>
                            <input type="text" class="form-control" placeholder="Usuário ou Email" name="usuario" required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <h5>
                                <label for="senha" class="form-label">Senha:</label>
                            </h5>
                            <input type="password" class="form-control" placeholder="Senha" name="senha" required>
                        </div>
                    </div>
                    <br>
                    <div class="row ">
                        <div class="col-12 d-flex justify-content-center">
                            <input type="submit" class="btn btn-primary" value="Logar">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>

      <footer class="p-4 fixed-botton text-center text-light" style="background-color: black;">
        Site desenvolvido por: <br>
        Arthur, Felipe, Gabriel e Mike Will <br>
        3B <br>
        © 2024 SoulCenter - Todos direitos reservados.
      </footer>
    </body>

    </html>
  `);
});


// Rota para inserir um novo usuário
app.post('/usuario_add', async (req, res) => {
  const { usuario, email, senha } = req.body;

  try {
    // Consulta para verificar se já existe o usuário ou email
    const checkSql = "SELECT * FROM usuario WHERE usuario = ? OR email = ?";
    con.query(checkSql, [usuario, email], async (err, results) => {
      if (err) {
        return res.send(`
          <script>
            alert('Erro ao verificar usuário: ${err.message}');
            window.history.back();
          </script>
        `);
      }

      // Se existir, retorna um alerta
      if (results.length > 0) {
        return res.send(`
          <script>
            alert('Usuário ou email já cadastrado. Tente novamente.');
            window.history.back();
          </script>
        `);
      }

      // Criptografar a senha antes de salvar no banco
      const hashedPassword = await bcrypt.hash(senha, 10); // Gera o hash da senha com 10 saltos

      // Insere o novo usuário
      const sql = "INSERT INTO usuario (usuario, email, senha, admin) VALUES (?, ?, ?, '0')";
      con.query(sql, [usuario, email, hashedPassword], (err, result) => {
        if (err) {
          return res.send(`
            <script>
              alert('Erro ao cadastrar usuário: ${err.message}');
              window.history.back();
            </script>
          `);
        }

        // Redireciona para a página de login após o alerta
        res.send(`
          <script>
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/login'; // Redireciona para a página de login
          </script>
        `);
      });
    });
  } catch (err) {
    console.error("Erro ao processar a solicitação:", err);
    res.send(`
      <script>
        alert('Erro interno no servidor. Tente novamente mais tarde.');
        window.history.back();
      </script>
    `);
  }
});


// Rota para logar um usuário
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Consulta para verificar se o identificador corresponde a email ou nome de usuário
  const sql = "SELECT * FROM usuario WHERE email = ? OR usuario = ?";
  con.query(sql, [usuario, usuario], async (err, results) => {
    if (err) {
      return res.send(`
        <script>
          alert('Erro ao acessar o banco de dados: ${err.message}');
          window.history.back();
        </script>
      `);
    }

    // Verifica se o email ou usuário foi encontrado
    if (results.length === 0) {
      return res.send(`
        <script>
          alert('Usuário ou senha inválidos.');
          window.history.back();
        </script>
      `);
    }

    const user = results[0];

    // Compara a senha enviada com o hash armazenado
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (senhaCorreta) {
      req.session.user = { id: user.id, usuario: user.usuario, email: user.email, admin: results[0].admin };
      // Se a senha estiver correta, redireciona para o menu
      res.send(`
        <script>
          alert('Login realizado com sucesso!');
          window.location.href = '/'; // Redireciona para a página inicial
        </script>
      `);
    } else {
      // Senha incorreta
      res.send(`
        <script>
          alert('Usuário ou senha inválidos.');
          window.history.back();
        </script>
      `);
    }
  });
});


// Rota para deslogar um usuário
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send(`
        <script>
          alert('Erro ao sair da conta.');
          window.history.back();
        </script>
      `);
    }
    res.redirect('/'); // Redireciona para a página inicial após o logout
  });
});


// Middleware para verificar se o usuário está logado
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Define o usuário logado como variável global no template
  next();
});


// Rota para cadastrar jogos
app.get('/cadastro', (req, res) => {
  const user = req.session.user;
  const menu = user
    ? `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro">Cadastrar Jogo</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/logout">Sair da Conta</a>
      </li>
    `
    : `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro_usuario">Cadastrar Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/login">Login Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
    `;

  let formHtml = `
      <!DOCTYPE html>
        <html lang="pt-BR">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Alterar Jogos</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            <link rel="shortcut icon" href="../uploads/img/lobo.png" type="image/x-icon">
            <link rel="stylesheet" href="uploads/css/style.css">
        </head>

        <body class="d-flex flex-column min-vh-100">
            <nav class="navbar navbar-expand-sm" style="background-color: black;">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/"><img src="../uploads/img/logosite.png" alt="Logo" height="50px"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                            ${menu}
                        </ul>
                    </div>
                </div>
            </nav>

            <main class="flex-grow-1">
            <div class="container-fluid mb-4">
                <div class="row p-3">
                    <div class="col-12 text-center">
                        <h1 style="font-weight: bold;">Cadastrar Jogo</h1>
                    </div>
                </div>
                <div class="row justify-content-center">
      `;

  formHtml += `
      <div class="col-md-5 p-3" style="border: 5px solid #9C9C9C; border-radius: 20px;">
                <form action="/submit_add" method="post" enctype="multipart/form-data">
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="nome" class="form-label">Nome:</label>
                            <input type="text" class="form-control" placeholder="Nome" name="nome" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="genero" class="form-label">Gênero:</label>
                            <input type="text" class="form-control" placeholder="Gênero" name="genero" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="lancamento" class="form-label">Data de Lançamento:</label>
                            <input type="text" class="form-control" placeholder="Data de Lançamento" name="lancamento" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="resumo" class="form-label">Resumo:</label>
                            <input type="text" class="form-control" placeholder="Resumo" name="resumo" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="imagem" class="form-label">Imagem:</label>
                            <input type="file" class="form-control" placeholder="Imagem" name="imagem" required>
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-12 d-flex justify-content-center">
                            <input type="submit" class="btn btn-primary" value="Cadastrar">
                        </div>
                    </div>
                </form>
            </div>  
      `;

  formHtml += ` </div>
    </div>
    </main>
    
    <footer class="p-4 fixed-botton text-center text-light" style="background-color: black;">
        Site desenvolvido por: <br>
        Arthur, Felipe, Gabriel e Mike Will <br>
        3B <br>
        © 2024 SoulCenter - Todos direitos reservados.
    </footer>
    </body>

    </html>`;
  res.send(formHtml);
});


// Rota para listar todos os jogos e permitir atualização
app.post('/list_update', (req, res) => {
  const { campo } = req.body;
  const user = req.session.user;
  const menu = user
    ? `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro">Cadastrar Jogo</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/logout">Sair da Conta</a>
      </li>
    `
    : `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro_usuario">Cadastrar Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/login">Login Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
    `;

  let sql;
  let queryParams = [];

  sql = "SELECT * FROM jogo WHERE id = ?";
  queryParams = [campo];

  con.query(sql, queryParams, (err, result) => {
    if (err) {
      return res.send(`
        <script>
          alert('Erro ao listar jogo para alterar: ${err.message}');
          window.history.back();
        </script>
      `);
    };

    let formHtml = `
      <!DOCTYPE html>
        <html lang="pt-BR">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SoulCenter</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            <link rel="shortcut icon" href="../uploads/img/lobo.png" type="image/x-icon">
            <link rel="stylesheet" href="uploads/css/style.css">
        </head>

        <body class="d-flex flex-column min-vh-100">
            <nav class="navbar navbar-expand-sm" style="background-color: black;">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/"><img src="../uploads/img/logosite.png" alt="Logo" height="50px"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                            ${menu}
                        </ul>
                    </div>
                </div>
            </nav>

            <main class="flex-grow-1">
            <div class="container-fluid mb-4">
                <div class="row p-3">
                    <div class="col-12 text-center">
                        <h1 style="font-weight: bold;">Alterar o Jogo</h1>
                    </div>
                </div>
                <div class="row justify-content-center">
      `;

    result.forEach(jogo => {
      formHtml += `
      <div class="col-md-5 p-3" style="border: 5px solid #9C9C9C; border-radius: 20px;">
                <form action="/submit_update" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="id" value="${jogo.id}">
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="nome" class="form-label">Nome:</label>
                            <input type="text" class="form-control" placeholder="Nome" name="nome" required value="${jogo.nome}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="genero" class="form-label">Gênero:</label>
                            <input type="text" class="form-control" placeholder="Gênero" name="genero" required value="${jogo.genero}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="lancamento" class="form-label">Data de Lançamento:</label>
                            <input type="text" class="form-control" placeholder="Data de Lançamento" name="lancamento" required value="${jogo.lancamento}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="resumo" class="form-label">Resumo:</label>
                            <input type="text" class="form-control" placeholder="Resumo" name="resumo" required value="${jogo.resumo}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="imagem" class="form-label">Imagem:</label>
                            <br><img src="/uploads/${jogo.imagem}" width="100"><br>
                            <input type="file" class="form-control" placeholder="Imagem" name="imagem">
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-12 d-flex justify-content-center">
                            <input type="submit" class="btn btn-primary" value="Alterar">
                        </div>
                    </div>
                </form>
            </div>  
      `;
    });

    formHtml += ` </div>
    </div>
    </main>
    
    <footer class="p-4 fixed-botton text-center text-light" style="background-color: black;">
        Site desenvolvido por: <br>
        Arthur, Felipe, Gabriel e Mike Will <br>
        3B <br>
        © 2024 SoulCenter - Todos direitos reservados.
    </footer>
    </body>

    </html>`;
    res.send(formHtml);
  });
});


// Rota para atualizar um jogo existente
app.post('/submit_update', upload.single('imagem'), (req, res) => {
  const { id, nome, genero, lancamento, resumo } = req.body;
  let image = req.file ? req.file.filename : null;

  let sql = "UPDATE jogo SET nome = ?, genero = ?, lancamento = ?, resumo = ?";
  let params = [nome, genero, lancamento, resumo];

  if (image) {
    sql += ", imagem = ?";
    params.push(image);
  }

  sql += " WHERE id = ?";
  params.push(id);

  con.query(sql, params, function (err, result) {
    if (err) {
      return res.send(`
        <script>
          alert('Erro ao alterar jogo: ${err.message}');
          window.history.back();
        </script>
      `);
    };
    res.send(`
      <script>
        alert('Alteração realizada com sucesso!');
        window.history.back();
      </script>
    `);
  });
});


// Rota para deletar um jogo
app.post('/submit_del', (req, res) => {
  const { id } = req.body;

  const sql = "DELETE FROM jogo WHERE id = ?";
  con.query(sql, [id], function (err, result) {
    if (err) {
      return res.send(`
        <script>
          alert('Erro ao deletar jogo: ${err.message}');
          window.history.back();
        </script>
      `);
    };
    res.send(`
      <script>
        alert('Jogo deletado com sucesso!');
        window.history.back();
      </script>
    `);
  });
});


// Rota para inserir um novo jogo
app.post('/submit_add', upload.single('imagem'), (req, res) => {
  const { nome, genero, lancamento, resumo } = req.body;
  const image = req.file.filename;

  const sql = "INSERT INTO jogo (nome, genero, lancamento, resumo, imagem) VALUES (?, ?, ?, ?, ?)";
  con.query(sql, [nome, genero, lancamento, resumo, image], function (err, result) {
    if (err) {
      return res.send(`
        <script>
          alert('Erro ao cadastrar jogo: ${err.message}');
          window.history.back();
        </script>
      `);
    };
    res.send(`
      <script>
        alert('Cadastro realizado com sucesso!');
        window.history.back();
      </script>
    `);
  });
});


// Rota para listar todos os jogos
app.get('/listtodos', (req, res) => {
  const sql = "SELECT * FROM jogo";
  const user = req.session.user;
  const isAdmin = user && user.admin === '1';

  const menu = user
    ? `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro">Cadastrar Jogo</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/logout">Sair da Conta</a>
      </li>
    `
    : `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro_usuario">Cadastrar Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/login">Login Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
    `;

  con.query(sql, function (err, result) {
    if (err) {
      return res.send(`
        <script>
          alert('Erro ao listar jogos: ${err.message}');
          window.history.back();
        </script>
      `);
    }

    let Html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SoulCenter</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <link rel="shortcut icon" href="../uploads/img/lobo.png" type="image/x-icon">
        <link rel="stylesheet" href="uploads/css/style.css">
      </head>

      <body class="d-flex flex-column min-vh-100">
        <nav class="navbar navbar-expand-sm" style="background-color: black;">
          <div class="container-fluid">
            <a class="navbar-brand" href="/"><img src="../uploads/img/logosite.png" alt="Logo" height="50px"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
              <ul class="navbar-nav">
                ${menu}
              </ul>
            </div>
          </div>
        </nav>

        <main class="flex-grow-1">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12 d-flex justify-content-center pt-4">
              <h1 style="font-weight: bold;">Biblioteca de Jogos</h1>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <div class="row p-5 pt-4">
            <div class="col-md-4 ">
              <form action="/submit_where" method="post">
                <div class="input-group">
                  <input type="text" class="form-control" name="buscar" placeholder="Buscar Jogo">
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-primary"><i class="bi bi-search"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-md-11 mb-4">
              <div class="card p-4" style="border: 5px solid #9C9C9C; border-radius: 20px;">
    `;

    result.forEach(jogo => {
      Html += `
        <div class="row g-0">
          <div class="col-md-3">
            <img src="uploads/${jogo.imagem}" class="img-fluid" alt="${jogo.nome}" style="border-radius: 20px;">
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <h5 class="card-title">${jogo.nome}</h5>
              <p class="card-text"><strong>Gênero:</strong> ${jogo.genero}</p>
              <p class="card-text"><strong>Data de Lançamento:</strong> ${jogo.lancamento}</p>
              <p class="card-text" style="text-align: justify;">${jogo.resumo}</p>
              ${isAdmin ? `
                <div class="d-flex justify-content-end action-buttons">
                  <form action="/list_update" method="post">
                    <input type="hidden" name="campo" value="${jogo.id}">
                    <button class="btn btn-primary"><i class="bi bi-pencil-square"></i> Alterar</button>
                  </form>
                  <form action="/submit_del" method="post">
                    <input type="hidden" name="id" value="${jogo.id}">
                    <button class="btn btn-danger"><i class="bi bi-trash"></i> Excluir</button>
                  </form>
                </div>
              ` : ''}
            </div>
          </div>
          <hr class="mt-3">
        </div>
      `;
    });

    Html += `
              </div>
            </div>
          </div>
        </div>
        </main>

        <footer class="p-4 text-center text-light" style="background-color: black;">
          Site desenvolvido por: <br>
          Arthur, Felipe, Gabriel e Mike Will <br>
          3B <br>
          © 2024 SoulCenter - Todos direitos reservados.
        </footer>
      </body>
      </html>
    `;
    res.send(Html);
  });
});


// Rota para listar os usuários com condição
app.post('/submit_where', (req, res) => {
  const { buscar } = req.body;
  const user = req.session.user;
  const isAdmin = user && user.admin === '1';
  const menu = user
    ? `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro">Cadastrar Jogo</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/logout">Sair da Conta</a>
      </li>
    `
    : `
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/cadastro_usuario">Cadastrar Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/login">Login Usuário</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white text-decoration-none" href="/listtodos">Biblioteca de Jogos</a>
      </li>
    `;

  let sql;
  let queryParams = [];

  if (buscar === "*") {
    sql = "SELECT * FROM jogo";
  } else {
    sql = "SELECT * FROM jogo WHERE id = ? OR nome = ? OR genero = ? OR lancamento = ? OR resumo = ?";
    queryParams = [buscar, buscar, buscar, buscar, buscar];
  }

  con.query(sql, queryParams, function (err, result) {
    if (err) {
      return res.send(`
        <script>
          alert('Erro ao listar jogo com condição: ${err.message}');
          window.history.back();
        </script>
      `);
    };

    let Html = `
      <!DOCTYPE html>
        <html lang="pt-BR">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Alterar Jogos</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <link rel="shortcut icon" href="../uploads/img/lobo.png" type="image/x-icon">
            <link rel="stylesheet" href="uploads/css/style.css">
        </head>

        <body class="d-flex flex-column min-vh-100">
            <nav class="navbar navbar-expand-sm" style="background-color: black;">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/"><img src="../uploads/img/logosite.png" alt="Logo" height="50px"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul class="navbar-nav">
                          ${menu}
                        </ul>
                    </div>
                </div>
            </nav>

            <main class="flex-grow-1">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12 d-flex justify-content-center pt-4">
                  <h1 style="font-weight: bold;">Biblioteca de Jogos</h1>
                </div>
              </div>
            </div>

            <div class="container-fluid">
              <div class="row p-5 pt-4">
                <div class="col-md-4 ">
                  <form action="/submit_where" method="post">
                    <div class="input-group">
                      <input type="text" class="form-control" name="buscar" placeholder="Buscar Jogo">
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-primary"><i class="bi bi-search"></i></button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="container-fluid">
              <div class="row justify-content-center">
                <div class="col-md-11 mb-4">
                  <div class="card p-4" style="border: 5px solid #9C9C9C; border-radius: 20px;">
    `;

    result.forEach(jogo => {
      Html += `
        <div class="row g-0">
            <div class="col-md-3">
              <img src="uploads/${jogo.imagem}" class="img-fluid " alt="${jogo.nome}" style="border-radius: 20px;">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${jogo.nome}</h5>
                <p class="card-text"><strong>Gênero:</strong> ${jogo.genero}</p>
                <p class="card-text"><strong>Data de Lançamento:</strong> ${jogo.lancamento}</p>
                <p class="card-text" style="text-align: justify;"> ${jogo.resumo}</p>
                ${isAdmin ? `
                  <div class="d-flex justify-content-end action-buttons">
                    <form action="/list_update" method="post">
                      <input type="hidden" name="campo" value="${jogo.id}">
                      <button class="btn btn-primary"><i class="bi bi-pencil-square"></i> Alterar</button>
                    </form>
                    <form action="/submit_del" method="post">
                      <input type="hidden" name="id" value="${jogo.id}">
                      <button class="btn btn-danger"><i class="bi bi-trash"></i> Excluir</button>
                    </form>
                  </div>
                ` : ''}
              </div>
            </div>
            <hr class="mt-3">
          </div>
      `;
    });
    Html += `
              </div>
            </div>
          </div>
        </div>
        </main>

        <footer class="p-4 text-center text-light" style="background-color: black;">
          Site desenvolvido por: <br>
          Arthur, Felipe, Gabriel e Mike Will <br>
          3B <br>
          © 2024 SoulCenter - Todos direitos reservados.
        </footer>

      </body>

      </html>
    `;
    res.send(Html);
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
