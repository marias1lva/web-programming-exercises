import conectarAoBanco from '../../src/config/dbConfig.js';
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export const getPosts = async () => {
  const db = conexao.db("instavale");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

export const createPost = async (post) => {
  const db = conexao.db("instavale");
  const colecao = db.collection("posts");
  return colecao.insertOne(post);
}

export default getPosts;