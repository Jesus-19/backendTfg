import express from "express";
import { connection } from "../db/connection.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT * FROM tareas";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las tareas:", err);
      return res.status(500).json({
        error: true,
        message: "Error en el servidor al obtener las tareas.",
      });
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { titulo, descripcion, fecha, hora, prioridad, id_hijo, estado } = req.body;

  if (!titulo|| !id_hijo) {
    return res.status(400).json({
      error: true,
      message: "El título y el id hijo son obligatorios.",
    });
  }

  const query =
    "INSERT INTO tareas (titulo, descripcion, fecha, hora, prioridad, id_hijo, estado) VALUES (?, ?, ?, ?, ?, ?, ?)";

  connection.query(query, [titulo, descripcion, fecha, hora, prioridad, id_hijo, estado], (err, result) => {
    if (err) {
      console.error("Error al crear la tarea:", err);
      return res.status(500).json({
        error: true,
        message: "Error en el servidor al crear la tarea.",
      });
    }

    res.status(201).json({
      message: "Tarea creada exitosamente",
      taskId: result.insertId,
    });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha, hora, prioridad, id_hijo, estado} = req.body;

  if (!titulo || !id_hijo) {
    return res.status(400).json({
      error: true,
      message: "El título y el id hijo son obligatorios.",
    });
  }

  const query =
    "UPDATE tareas SET titulo = ?, descripcion = ?, fecha = ?, hora = ?, prioridad = ?, id_hijo = ?, estado = ? WHERE id_tarea = ?";

  connection.query(query, [titulo, descripcion, fecha, hora, prioridad, id_hijo, estado, id], (err, result) => {
    if (err) {
      console.error("Error al actualizar la tarea:", err);
      return res.status(500).json({
        error: true,
        message: "Error en el servidor al actualizar la tarea.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        message: "Tarea no encontrada.",
      });
    }

    res.json({
      message: "Tarea actualizada exitosamente",
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM tareas WHERE id_tarea = ?";

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar la tarea:", err);
      return res.status(500).json({
        error: true,
        message: "Error en el servidor al eliminar la tarea.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: true,
        message: "Tarea no encontrada.",
      });
    }

    res.json({
      message: "Tarea eliminada exitosamente",
    });
  });
});

export default router;