const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const PORT = 3333;

app.use(bodyParser.json());

// Configuração do Sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite", // Nome do arquivo do banco de dados
});

// Definição do modelo de usuário
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincronize o modelo com o banco de dados (cria as tabelas)
sequelize.sync();

// Endpoint para registro de usuário
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.json({ message: "Usuário registrado com sucesso!", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao registrar usuário", error: error.message });
  }
});

// Endpoint para login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      const token = jwt.sign({ username }, "suaChaveSecreta", {
        expiresIn: "1h",
      });
      res.json({ message: "Login bem-sucedido", token });
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao realizar login", error: error.message });
  }
});

// Endpoint para buscar todos os usuários
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuários", error: error.message });
  }
});

// Endpoint para buscar um usuário pelo ID
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuário por ID", error: error.message });
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, "suaChaveSecreta", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const Movie = sequelize.define("Movie", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING, // Isso depende de como você está representando o ID do usuário em seu modelo
    allowNull: false,
  },
});

// Endpoint protegido - exemplo de acesso autenticado
app.post("/user/movies", authenticateToken, async (req, res) => {
  try {
    const { title, image, category, rating, synopsis } = req.body;

    // Obtenha o ID do usuário autenticado a partir do token
    const userId = req.user.username;

    // Crie o filme associado ao usuário
    const movie = await Movie.create({
      title,
      image,
      category,
      rating,
      synopsis,
      userId,
    });

    res.json({ message: "Filme criado com sucesso!", movie });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar filme", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
