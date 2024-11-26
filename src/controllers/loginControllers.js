import express from "express";
import { connection } from "../db/connection.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "Email y contraseña son obligatorios." });
  }

  connection.query(
    "SELECT * FROM padres WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error("Error al buscar el usuario:", err);
        return res
          .status(500)
          .json({ error: true, message: "Error en el servidor." });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ error: true, message: "Usuario o contraseña incorrectos." });
      }

      const user = results[0];

      if (password !== user.password) {
        return res
          .status(401)
          .json({ error: true, message: "Usuario o contraseña incorrectos." });
      }

      return res.json({
        success: true,
        message: "Inicio de sesión exitoso.",
        userId: user.id,
        email: user.email,
        password: user.password,
        nombre: user.nombre
      });
    }
  );
});

export default router;