import db from "../config/db.js";

export const favoritoController = {
  async getAll(req, res) {
    try {
      const result = await db.query(
        "SELECT id_favorito, id_usuario, id_receita, created_at FROM public.favorito"
      );
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao buscar favoritos." });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        "SELECT id_favorito, id_usuario, id_receita, created_at FROM public.favorito WHERE id_favorito = $1",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Favorito não encontrado." });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao buscar favorito." });
    }
  },

  async create(req, res) {
    try {
      const { id_usuario, id_receita } = req.body;

      if (!id_usuario || !id_receita) {
        return res.status(400).json({ mensagem: "Usuário e receita são obrigatórios." });
      }

      const now = new Date();
      const result = await db.query(
        `INSERT INTO public.favoritos (id_usuario, id_receita, created_at, updated) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id_favorito, id_usuario, id_receita`,
        [id_usuario, id_receita, now, now]
      );

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao criar favorito." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { id_usuario, id_receita } = req.body;
      const now = new Date();

      const result = await db.query(
        `UPDATE public.favorito 
         SET id_usuario = $1, id_receita = $2, updated = $3 
         WHERE id_favorito = $4 
         RETURNING id_favorito, id_usuario, id_receita`,
        [id_usuario, id_receita, now, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Favorito não encontrado." });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao atualizar favorito." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await db.query(
        "DELETE FROM public.favorito WHERE id_favorito = $1 RETURNING id_favorito",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ mensagem: "Favorito não encontrado." });
      }

      return res.status(200).json({ mensagem: "Favorito removido com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "Erro ao remover favorito." });
    }
  }
};

export default favoritoController;