import db from "../config/db.js";

export const usuarioController = {
  async getAll(req, res) {
    try {
      const result = await db.query("SELECT id, nome, email, foto, tipo FROM usuario");
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao buscar usuário." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        "SELECT id, nome, email, foto, tipo FROM usuarios WHERE id = $1",
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
      const { nome, email, senha, foto, tipo } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Nome, e-mail e senha são obrigatórios." });
      }

      const result = await db.query(
        "INSERT INTO usuario (nome, email, senha, foto, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, email, foto, tipo",
        [nome, email, senha, foto || null, tipo || 'user']
      );

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao criar usuário." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, foto, tipo } = req.body;

      const result = await db.query(
        "UPDATE usuario SET nome = $1, email = $2, foto = $3, tipo = $4 WHERE id = $5 RETURNING id, nome, email, foto, tipo",
        [nome, email, foto, tipo, id]
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
      const result = await db.query("DELETE FROM usuario WHERE id = $1 RETURNING id", [id]);

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
        "SELECT id, nome, email, foto, tipo FROM usuario WHERE email = $1 AND senha = $2",
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