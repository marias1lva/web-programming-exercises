import { getPosts, createPost } from "../models/postModel.js";

export const controllerGetPosts = async (req, res) => {
  const posts = await getPosts();
  res.status(200).json(posts);
}

export const controllerPostPost = async (req, res) => {
  const postReq = req.body;
  try{
    const postCriado = await createPost(postReq);
    res.status(200).json(postCriado);
  }catch(erro){
    console.error(erro.message);
    res.status(500).json({message: "Erro ao criar post"});
  }
}

export default controllerGetPosts;