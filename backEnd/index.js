const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Inicializa o Resend com sua chave da API
const resend = new Resend(process.env.RESEND_API_KEY);

// Middlewares
app.use(express.json());

// ✅ CORS configurado corretamente
app.use(
  cors({
    origin: [
      "http://localhost:5173", // para teste local
      "https://portfolio-backend-api-jpzu.onrender.com", // o próprio backend
      "https://seu-frontend.vercel.app", // 🔁 TROQUE pelo seu domínio real do Vercel
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// 🔹 Rota teste
app.get("/", (req, res) => res.send("API de Contato funcionando! 🚀"));

// 🔹 Rota de envio de email
app.post("/api/contato", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // remetente gratuito do Resend
      to: process.env.EMAIL, // seu email configurado no .env
      subject: `Mensagem de ${nome} via Portfólio`,
      text: `
        Nome: ${nome}
        Email: ${email}
        Mensagem:
        ${mensagem}
      `,
    });

    res.json({ message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    res.status(500).json({ error: "Erro ao enviar a mensagem." });
  }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
