import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routers";
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors()); //Seguridad para navegadores
app.use(router);
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
