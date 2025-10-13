import controllerGetPosts from '../controllers/postController.js';

const getPostRoutes = (app) => {
    app.get('/posts', controllerGetPosts);
}

export default getPostRoutes;