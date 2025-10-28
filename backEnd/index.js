const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

// Rota teste
app.get("/", (req, res) => {
  res.send("API de Contato funcionando (teste)!");
});

// Rota de contato
app.post("/api/contato", (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  // Simula envio de email, mas sempre retorna sucesso
  console.log(`Mensagem recebida: Nome=${nome}, Email=${email}, Mensagem=${mensagem}`);

  res.json({ message: "Mensagem enviada com sucesso! (teste)" });
});

app.listen(PORT, () => console.log(`Servidor de teste rodando na porta ${PORT}`));
