const API_URL_BASE = "http://127.0.0.1:3000";

export const getPostsApi = async () => {
    try{
        const response = await fetch(`${API_URL_BASE}/posts`);
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Erro ao buscar os posts: ", error);
    }

}

export const uploadApi = async (imagem, descricao) => {
    try{
        const form = new FormData();
        form.append('image', imagem);
        form.append('descricao', descricao);
        const response = await fetch(`${API_URL_BASE}/upload`,{
                method: "POST",
                body: form
            });
        if(!response.ok){
            throw new Error("erro ao enviar o post");
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.error("Erro ao buscar os posts: ", error);
    }
}

export const updatePostApi = async (id, descricao) => {
  try {
    const response = await fetch(`${API_URL_BASE}/post/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descricao })
    });

    if (!response.ok) throw new Error("Erro ao atualizar o post");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar o post:", error);
  }
}

export const deletePostApi = async (id) => {
  try {
    const response = await fetch(`${API_URL_BASE}/post/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Erro ao deletar o post");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao deletar o post:", error);
  }
}




