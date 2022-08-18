const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonGif = document.querySelector('.pokemon_gif');


const form = document.querySelector('.form');
const inputPokemon = document.querySelector('.input_search');


//Função para consumir a PokéAPI
const fetchPokemon = async (pokemon) => {
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (ApiResponse.status == 200){
        const data = await ApiResponse.json();
        return data;
    };
}

//Renderiza os dados
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
        //  Pegando nome e id do pokemon
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        // Pegando o Gif
        // Refazendo o caminnho da api para buscar o gif
        pokemonGif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        console.log(pokemonName,pokemonNumber);
        pokemonGif.style.display = 'block';
    } else {
        pokemonGif.style.display = 'none';
        pokemonName.innerHTML = 'não encontrado';
    }
    
}

form.addEventListener('submit',(event) =>{
    event.preventDefault();
    //Pegando o valor do input
    renderPokemon(inputPokemon.value.toLowerCase());
    // zera o campo
    inputPokemon.value = '';
    inputPokemon.focus();
});

renderPokemon('1');