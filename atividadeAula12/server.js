import 'dotenv/config';
import express from "express";
import getPostRoutes from "./src/routes/postRoutes.js";
import formData from "express-form-data";

const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.use(formData.parse());

getPostRoutes(app);

app.listen(3000, () => {
    console.log("Servidor escutando...");
});