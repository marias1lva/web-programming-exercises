import conectarAoBanco from "../config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

const getPosts = async function () => {
  const db = conexao.db('instavale');
  const colecao = db.collection('posts');
  return colecao.find().toArray();
}

export default getPosts;
