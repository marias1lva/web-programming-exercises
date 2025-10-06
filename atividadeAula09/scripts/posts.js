const getPosts = function() {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url)
        .then((response) => response.json())
        .then(posts => {
            const cards = document.getElementById('posts');
            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `<img src="././assets/download.jpg"
                <div class="card-body">
                    <h2 class="card-title">${post.title}</h2>
                    <p class="card-text">${post.body}</p>
                </div>
                <div class="card-footer"></div>
                `;
                cards.appendChild(card);
            })
        });
}
getPosts();