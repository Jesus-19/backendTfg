import mysql from "mysql2";
import "dotenv/config";

const mysqlUri = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export const connection = mysql.createConnection(mysqlUri);

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a MySQL: " + err.stack);
    return;
  }
  console.log("Conexión a MySQL establecida.");
});