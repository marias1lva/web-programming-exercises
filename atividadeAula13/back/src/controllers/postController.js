import { getPosts, createPost, updatePost, deletePost } from "../models/postModel.js";
import { ObjectId } from "mongodb";
import fs from "fs";

export const controllerGetPosts = async (req, res) => {
  const posts = await getPosts();
  res.status(200).json(posts);
}

export const controllerPostPost = async (req, res) =>{
  const postReq = req.body;
  try {
    const postCriado = await createPost(postReq);
    res.status(200).json(postCriado);
  }catch (erro){
    console.log(erro.message);
    res.status(500).json({"erro":"Falha na requisição..."});
  }
}

export const controllerUploadImage = async (req, res) => {
 const _id = new ObjectId();
 const imgUrl = `http://localhost:3000/${_id}.png`;
 const descricao = req.body.descricao; //
 const post = {
  "_id":_id,
  "descricao": descricao, 
  "imgUrl":imgUrl
 };
 try {
    const postCriado = await createPost(post);
    const enderecoImg = `uploads/${_id}.png`;
    fs.renameSync(req.file.path, enderecoImg);
    res.status(200).json(postCriado);
  }catch (erro){
    console.log(erro.message);
    res.status(500).json({"erro":"Falha na requisição..."});
  }
}

export const controllerUpdatePost = async (req, res) => {
  const id = req.params.id;
  const descricao = req.body.descricao;
  const imgUrl = `http://localhost:3000/${id}.png`;

  const postAtualizado = {
    descricao,
    imgUrl
  };

  try {
    const resultado = await updatePost(id, postAtualizado);
    res.status(200).json({ message: "Post atualizado com sucesso!", resultado });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Falha ao atualizar post" });
  }
};

export const controllerDeletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await deletePost(id);
    const caminhoImagem = `uploads/${id}.png`;

    if (fs.existsSync(caminhoImagem)) {
      fs.unlinkSync(caminhoImagem);
    }

    res.status(200).json({ message: "Post deletado com sucesso!", resultado });
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ erro: "Falha ao deletar post" });
  }
};