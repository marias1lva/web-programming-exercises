import 'dotenv/config';
import express from "express";
import formData from "express-form-data";
import getPostRoutes from "./src/routes/postRoutes.js";
import cors from "cors";

const corsOptions = {
  origin: '*',  
  methods: ['GET', 'POST',  'PUT', 'DELETE'],
  optionsSuccessStatus: 200
}

const app = express();
app.use(express.json());
app.use(formData.format());
app.use(express.static("uploads"));
app.use(cors(corsOptions))

getPostRoutes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});