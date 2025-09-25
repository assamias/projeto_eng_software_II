import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "segredo123"; // em produção usar variável de ambiente

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do curso rodando 🚀");
});

// Cadastro
app.post("/api/register", async (req, res) => {
  const { nome, email, senha } = req.body;
  const hashed = await bcrypt.hash(senha, 10);
  try {
    const user = await prisma.user.create({
      data: { nome, email, senha: hashed }
    });
    res.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(400).json({ error: "Email já cadastrado" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1d" });
  res.json({ token, nome: user.nome });
});

// Middleware para autenticação
function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    next();
  });
}

// Salvar progresso
app.post("/api/progresso", auth, async (req, res) => {
  const { modulo, aulas, quiz } = req.body;
  const progresso = await prisma.progresso.create({
    data: { modulo, aulas, quiz, userId: req.userId }
  });
  res.json(progresso);
});

// Buscar progresso
app.get("/api/progresso", auth, async (req, res) => {
  const progresso = await prisma.progresso.findMany({
    where: { userId: req.userId }
  });
  res.json(progresso);
});

app.listen(4000, () => console.log("Servidor rodando na porta 4000 🚀"));
