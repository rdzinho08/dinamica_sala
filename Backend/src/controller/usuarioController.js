import db from "../config/db.js";

export const usuarioController = {
  async getAll(req, res) {
    try {
      const result = await db.query(
        'SELECT id_usuario, nome, nome_usuario, email, imagem_usuario, "tipo(usuario,chef)", created_at, updated_at FROM public.usuario'
      );
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao buscar usuários." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        'SELECT id_usuario, nome, nome_usuario, email, imagem_usuario, "tipo(usuario,chef)", created_at, updated_at FROM public.usuario WHERE id_usuario = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao buscar usuário." });
    }
  },

  async create(req, res) {
  try {
    const { nome, nome_usuario, email, senha, imagem_usuario, tipo } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: "Nome, e-mail e senha são obrigatórios." });
    }

    const now = new Date();
    const result = await db.query(
      `INSERT INTO public.usuario (nome, nome_usuario, email, senha, imagem_usuario, "tipo(usuario,chef)", created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id_usuario, nome, nome_usuario, email, imagem_usuario, "tipo(usuario,chef)"`,
      [
        nome,
        nome_usuario || nome,
        email,
        parseInt(senha),
        imagem_usuario || '',
        tipo || 'usuario',
        now,
        now
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("ERRO NO POST:", error);
    return res.status(500).json({ 
      mensagem: "Erro ao criar usuário.", 
      detalhe: error.message,
      codigo: error.code 
    });
  }
},

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, nome_usuario, email, imagem_usuario, tipo } = req.body;
      const now = new Date();

      const result = await db.query(
        `UPDATE public.usuario 
         SET nome = $1, nome_usuario = $2, email = $3, imagem_usuario = $4, "tipo(usuario,chef)" = $5, updated_at = $6 
         WHERE id_usuario = $7 
         RETURNING id_usuario, nome, nome_usuario, email, imagem_usuario, "tipo(usuario,chef)"`,
        [nome, nome_usuario, email, imagem_usuario, tipo, now, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao atualizar usuário." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        "DELETE FROM public.usuario WHERE id_usuario = $1 RETURNING id_usuario",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json({ mensagem: "Usuário removido com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao deletar usuário." });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const result = await db.query(
        'SELECT id_usuario, nome, nome_usuario, email, imagem_usuario, "tipo(usuario,chef)" FROM public.usuario WHERE email = $1 AND senha = $2',
        [email, senha]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ mensagem: "Usuário não encontrado ou senha incorreta." });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro interno no servidor." });
    }
  }
};