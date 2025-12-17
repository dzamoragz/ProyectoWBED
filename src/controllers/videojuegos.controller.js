import pool from "../database/index.js";

/* LISTAR */
export const listVideojuegos = async (req, res) => {
  try {
    const query = `
      SELECT 
        v.idjuegos,
        v.nombre AS videojuego,
        c.nombre AS categoria,
        co.nombre AS consola
      FROM videojuegos v
      JOIN categorias c ON v.idcategoria = c.idcategoria
      JOIN consolas co ON v.idconsola = co.idconsola
      ORDER BY v.idjuegos;
    `;

    const result = await pool.query(query);

    res.render("videojuego/list", {
      videojuegos: result.rows
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* FORM ADD */
export const showAddForm = (req, res) => {
  res.render("videojuego/add");
};

/* ADD */
export const addVideojuego = async (req, res) => {
  const { idcategoria, idconsola, nombre } = req.body;

  try {
    await pool.query(
      `INSERT INTO videojuegos (idcategoria, idconsola, nombre)
       VALUES ($1, $2, $3)`,
      [idcategoria, idconsola, nombre]
    );

    res.redirect("/videojuego/list");

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* FORM EDIT */
export const showEditForm = async (req, res) => {
  const { idjuegos } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM videojuegos WHERE idjuegos = $1",
      [idjuegos]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Videojuego no encontrado" });
    }

    res.render("videojuego/edit", {
      videojuego: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
export const updateVideojuego = async (req, res) => {
  const { idjuegos } = req.params;
  const { idcategoria, idconsola, nombre } = req.body;

  try {
    await pool.query(
      `UPDATE videojuegos
       SET idcategoria = $1,
           idconsola = $2,
           nombre = $3
       WHERE idjuegos = $4`,
      [idcategoria, idconsola, nombre, idjuegos]
    );

    res.redirect("/videojuego/list");

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
export const deleteVideojuego = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM videojuegos WHERE idjuegos = $1",
      [id]
    );

    res.redirect("/videojuego/list");

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
