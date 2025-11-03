import { getPostsApi, deletePostApi, updatePostApi } from './fatchApi.js';

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
modal.style.display = "none";

const imageGrid = document.querySelector(".image-grid");

async function getPosts() {
  const data = await getPostsApi();
  try {
    const postsList = data.map(item => {
      return `
        <article data-id="${item._id}" data-description="${item.descricao}">
          <figure>
            <img src="${item.imgUrl}" alt="${item.descricao || 'Imagem'}" />
          </figure>
          <p>${item.descricao}</p>
          <div class="actions">
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
          </div>
        </article>
      `;
    }).join('');

    imageGrid.innerHTML = postsList;
    addImageClickEvents();
    addButtonEvents();
  } catch (error) {
    console.error("Erro ao popular página", error);
  }
}

function addImageClickEvents() {
  const images = document.querySelectorAll(".image-grid img");
  images.forEach(img => {
    img.addEventListener("click", function () {
      captionText.textContent = "";
      modal.style.display = "block";
      modalImg.src = this.src;

      const article = this.closest("article");
      const description = article ? article.dataset.description : '';
      captionText.innerHTML = `<p>${description || this.alt}</p>`;
    });
  });
}

function addButtonEvents() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation(); 
      const article = e.target.closest("article");
      const id = article.dataset.id;

      if (confirm("Deseja realmente excluir este post?")) {
        await deletePostApi(id);
        article.remove();
      }
    });
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const article = e.target.closest("article");
      const id = article.dataset.id;
      const descricaoAtual = article.dataset.description;

      const novaDescricao = prompt("Nova descrição:", descricaoAtual);
      if (novaDescricao && novaDescricao.trim() !== "") {
        await updatePostApi(id, novaDescricao);
        article.dataset.description = novaDescricao;
        article.querySelector("p").textContent = novaDescricao;
      }
    });
  });
}

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", getPosts);
