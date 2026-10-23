import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from '../routes/usuarioRoutes.js';
import receitaRoutes from '../routes/receitaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(usuarioRoutes);
app.use(receitaRoutes);

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});

