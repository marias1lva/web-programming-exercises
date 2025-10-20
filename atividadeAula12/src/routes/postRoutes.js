import { controllerGetPosts, controllerPostPost } from "../controllers/postController.js";

const getPostRoutes = (app) => {
    app.get("/posts", controllerGetPosts);
    app.post("/post", controllerPostPost);
}

export default getPostRoutes;