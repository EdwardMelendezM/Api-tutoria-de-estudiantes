import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routers";
import dbConnect from "./config/mongo";
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors()); //Seguridad para navegadores
app.use(express.json());
app.use(router);

dbConnect().then(() => console.log("Conexion correcta"));
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
