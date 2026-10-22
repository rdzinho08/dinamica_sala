import db from "../config/db.js";

export const receitasController = {
  async getAll(req, res) {
    try {
      const result = await db.query(
        `SELECT r.id, r.titulo, r.origem, r.imagem, r.id_usuario, u.nome AS chef,
                COUNT(f.id)::int AS total_favoritos
         FROM receitas r
         JOIN usuarios u ON r.id_usuario = u.id
         LEFT JOIN favoritos f ON f.id_receita = r.id
         GROUP BY r.id, r.titulo, r.origem, r.imagem, r.id_usuario, u.nome`
      );
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao buscar receitas." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        `SELECT r.id, r.titulo, r.origem, r.imagem, r.id_usuario, u.nome AS chef
         FROM receitas r
         JOIN usuarios u ON r.id_usuario = u.id
         WHERE r.id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Receita não encontrada." });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao buscar receita." });
    }
  },

  async create(req, res) {
    try {
      const { titulo, origem, imagem, id_usuario } = req.body;

      if (!titulo || !origem || !imagem || !id_usuario) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
      }

      const result = await db.query(
        `INSERT INTO receitas (titulo, origem, imagem, id_usuario) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, titulo, origem, imagem, id_usuario`,
        [titulo, origem, imagem, id_usuario]
      );

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao cadastrar receita." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { titulo, origem, imagem } = req.body;

      const result = await db.query(
        `UPDATE receitas 
         SET titulo = $1, origem = $2, imagem = $3 
         WHERE id = $4 
         RETURNING id, titulo, origem, imagem, id_usuario`,
        [titulo, origem, imagem, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Receita não encontrada." });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao atualizar receita." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await db.query("DELETE FROM favoritos WHERE id_receita = $1", [id]);

      const result = await db.query(
        "DELETE FROM receitas WHERE id = $1 RETURNING id",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Receita não encontrada." });
      }

      return res.status(200).json({ mensagem: "Receita excluída com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao excluir receita." });
    }
  },

  async listarPorUsuario(req, res) {
    try {
      const { id_usuario } = req.params;
      const result = await db.query(
        "SELECT id, titulo, origem, imagem FROM receitas WHERE id_usuario = $1",
        [id_usuario]
      );
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao buscar receitas do usuário." });
    }
  }
};