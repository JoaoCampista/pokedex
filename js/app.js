const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

//prettier-ignore
const generatePokemonPromises = () => Array(150).fill().map((_,index) =>
  fetch(getPokemonUrl(index + 1)).then((response) => response.json()));

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);
    // prettier-ignore
    accumulator += `
  <div class="">
    <h4 class="card-title">${id}. ${name}</h4>
    <img 
      class="card-image" style="width: 5rem; height: 5rem;"
      alt="${name}"
      src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"
    />

    <p class="card-subtitle">${elementTypes.join(' | ')}</p>

  </div>
`
    return accumulator;
  }, '');

const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromisses = generatePokemonPromises();

//<!--div class="card ${elementTypes[0]}"-->

// prettier-ignore
Promise.all(pokemonPromisses)
  .then(generateHTML)
  .then(insertPokemonsIntoPage);
