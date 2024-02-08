const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const connectToDatabase = require("./src/database/connect");
const UserModel = require("./src/models/user.model"); // Importa o modelo de usuário

const app = express();
const port = 8080;

app.use(bodyParser.json(), cors());

// Função para lidar com o cadastro de conta
async function cadastrarConta(req, res) {
  try {
    // Obtenha os dados enviados no corpo da requisição
    const { firstName, lastName, username, password } = req.body;

    // Cria um novo documento de usuário
    const newUser = new UserModel({
      firstName,
      lastName,
      username,
      password,
    });



    // Salva o novo usuário no banco de dados
    await newUser.save();

    // Responde com uma mensagem de confirmação
    res.status(201).send("Conta cadastrada com sucesso");
    console.log("Conta cadastrada com sucesso no banco de dados:");
    console.log(JSON.stringify(newUser.toJSON()));

  } catch (error) {
    console.error("Erro ao cadastrar conta:", error.message);
    res.status(500).send("Erro ao cadastrar conta");
  }
}

// Função para lidar com o login
async function login(req, res) {
  try {
      // Obtenha os dados enviados no corpo da requisição
      let { username, password } = req.body;


      // Procura um usuário com o username fornecido no banco de dados
      const user = await UserModel.findOne({ username });

      // Verifica se o usuário existe e se a senha corresponde ao usuário encontrado
      if (!user || user.password !== password) {
          res.status(201).json({ success: false, message: "Credenciais inválidas." });
          return;
      }

      // Se as credenciais estiverem corretas, responda com sucesso
      res.status(200).json({
          success: true,
          message: `Login realizado com sucesso.\n Nome: ${user.firstName}\n Sobrenome: ${user.lastName}\nUsername: ${user.username}\n Id: ${user._id}\n `
      });
  } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      res.status(500).json({ success: false, message: "Erro ao fazer login." });
  }
}

// Rota para receber dados de cadastro de conta
app.post("/conta/cadastrar", cadastrarConta);

// Rota para lidar com o login
app.post("/conta/login", login);

// Função para iniciar o servidor
function iniciarServidor() {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

// Inicia o servidor
iniciarServidor();

// Conecta ao banco de dados
connectToDatabase();
