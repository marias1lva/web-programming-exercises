async function getPokemons() {
  try{
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
    const response = await fetch(url);
    const data = await response.json();

    const container = document.getElementById('pokemons');

    for(const pokemon of data.results){
      const res = await fetch(pokemon.url);
      const pokeData = await res.json();

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
        <div class="card-body">
          <h2 class="card-title">${pokeData.name}</h2>
        </div>
        <div class="card-footer">ID: ${pokeData.id}</div>
      `;
      container.appendChild(card);
    }
  }catch(error){
    console.error('Erro ao buscar Pokémons:', error);
  }
}

getPokemons();
