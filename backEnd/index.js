const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET","POST"] }));

app.get("/", (req, res) => res.send("API de Contato funcionando!"));

app.post("/api/contato", async (req, res) => {
  const { nome, email, mensagem } = req.body;
  if (!nome || !email || !mensagem) return res.status(400).json({ error: "Todos os campos são obrigatórios!" });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Mensagem de ${nome} via Portfolio`,
    text: mensagem,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res.status(500).json({ error: "Erro ao enviar a mensagem." });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
