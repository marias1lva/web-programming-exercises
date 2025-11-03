import { 
  controllerGetPosts, 
  controllerPostPost, 
  controllerUploadImage, 
  controllerUpdatePost, 
  controllerDeletePost 
} from "../controllers/postController.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ dest: './uploads', storage });

const getPostRoutes = (app) => {
  app.get("/posts", controllerGetPosts);
  app.post("/post", controllerPostPost);
  app.post("/upload", upload.single('image'), controllerUploadImage);
  app.put("/post/:id", controllerUpdatePost);     // ✅ PUT
  app.delete("/post/:id", controllerDeletePost);  // ✅ DELETE
}

export default getPostRoutes;