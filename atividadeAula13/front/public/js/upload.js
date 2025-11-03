import { uploadApi } from "./fatchApi.js";

const addFormEvent = () => {
    const form = document.getElementById("form-post");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const descricao = document
                .getElementById("descricao").value;
            const imagem = document
                .getElementById("image").files[0];

            try {
                const data = await uploadApi(imagem, descricao);
                if (data) {
                    console.log(`Post ${data.insertedId} criado`);
                }
            } catch (error) {
                console.error("Erro ao buscar os posts: ", error);
            }
        })
    }
}
document.addEventListener("DOMContentLoaded", addFormEvent)