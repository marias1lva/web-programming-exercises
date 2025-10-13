import getPosts from "../models/postModel.js";

const controllerGetPosts = async (req, res) => {
    const posts = await getPosts();
    res.status(200).json(posts);
}

export default controllerGetPosts;