// const pokemonName = document.querySelector(".pokemon_name");
// const pokemonNumber = document.querySelector(".pokemon_number");
// const pokemonImage = document.querySelector(".pokemon_image");

// const form = document.querySelector(".form_search");
// const input = document.querySelector(".input_search");
// const buttonPrev = document.querySelector(".btn-prev");
// const buttonNext = document.querySelector(".btn-next");

// let searchPokemon = 1;

// const fetchPokemon = async pokemon => {
//   const APIResponse = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${pokemon}`
//   );
//   if (APIResponse.status === 200) {
//     const pokemonData = await APIResponse.json();
//     console.log(pokemonData);
//     return pokemonData;
//   }
// };

// const renderPokemon = async pokemon => {
//   pokemonName.innerHTML = "Loading...";
//   pokemonNumber.innerHTML = "";

//   const data = await fetchPokemon(pokemon);

//   if (data) {
//     pokemonImage.style.display = "block";
//     pokemonName.innerHTML = data.name;
//     pokemonNumber.innerHTML = data.id;
//     pokemonImage.src =
//       data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
//         "front_default"
//       ]; //Busncado o conteúdo na API
//     searchPokemon = data.id;
//     input.value = "";
//   } else {
//     pokemonImage.style.display = "none";
//     pokemonName.innerHTML = "Not Found :c";
//     pokemonNumber.innerHTML = "";
//   }
// };

// form.addEventListener("submit", event => {
//   event.preventDefault();
//   renderPokemon(input.value.toLowerCase());
// });

// buttonPrev.addEventListener("click", () => {
//   if (searchPokemon > 1) {
//     searchPokemon -= 1;
//     renderPokemon(searchPokemon);
//   }
// });
// buttonNext.addEventListener("click", () => {
//   searchPokemon += 1;
//   renderPokemon(searchPokemon);
// });

// renderPokemon(searchPokemon);

// input.addEventListener("input", () => {
//   const searchTerm = input.value.trim();
//   const { results, hasMatch } = fuzzySearch(searchTerm, pokemonData, "name");
//   if (hasMatch) {
//     renderPokemon(results[0].name.toLowerCase());
//   } else {
//     pokemonName.innerHTML = "Not found";
//     pokemonNumber.innerHTML = "";
//     pokemonImage.style.display = "none";
//   }
// });

// const pokemonName = document.querySelector(".pokemon_name");
// const pokemonNumber = document.querySelector(".pokemon_number");
// const pokemonImage = document.querySelector(".pokemon_image");

// const form = document.querySelector(".form_search");
// const input = document.querySelector(".input_search");
// const buttonPrev = document.querySelector(".btn-prev");
// const buttonNext = document.querySelector(".btn-next");

// let searchPokemon = 1;
// let pokemonList = [];

// // Função para buscar dados do Pokémon por ID
// const fetchPokemonById = async pokemonId => {
//   const APIResponse = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
//   );
//   if (APIResponse.status === 200) {
//     const pokemonData = await APIResponse.json();
//     return pokemonData;
//   }
// };

// // Função para buscar todos os Pokémons (usaremos para fuzzy search)
// const fetchAllPokemons = async () => {
//   const APIResponse = await fetch(
//     "https://pokeapi.co/api/v2/pokemon?limit=1000"
//   ); // Aqui pegamos os 1000 primeiros Pokémons
//   if (APIResponse.status === 200) {
//     const data = await APIResponse.json();
//     pokemonList = data.results; // Armazenamos os Pokémons em uma lista
//   }
// };

// // Função de fuzzy search (busca por nome)
// const fuzzySearch = (str, reference) => {
//   const normalizedStr = str.toLowerCase();

//   return reference.filter(item => {
//     const normalizedValue = item.name.toLowerCase();
//     return normalizedValue.includes(normalizedStr);
//   });
// };

// // Função para renderizar o Pokémon
// const renderPokemon = async pokemon => {
//   pokemonName.innerHTML = "Loading...";
//   pokemonNumber.innerHTML = "";

//   // Primeiro, pegamos o Pokémon da lista filtrada (caso esteja fazendo busca fuzzy)
//   const data = await fetchPokemonById(pokemon);

//   if (data) {
//     pokemonImage.style.display = "block";
//     pokemonName.innerHTML = data.name;
//     pokemonNumber.innerHTML = data.id;
//     pokemonImage.src =
//       data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
//         "front_default"
//       ];
//     searchPokemon = data.id;
//     input.value = "";
//   } else {
//     pokemonImage.style.display = "none";
//     pokemonName.innerHTML = "Not Found :c";
//     pokemonNumber.innerHTML = "";
//   }
// };

// // Função para busca usando o termo do input
// const handleSearch = async () => {
//   const searchTerm = input.value.toLowerCase();
//   if (searchTerm) {
//     // Realiza a busca fuzzy com os Pokémons carregados
//     const results = fuzzySearch(searchTerm, pokemonList);
//     if (results.length > 0) {
//       renderPokemon(results[0].name); // Exibe o primeiro Pokémon encontrado
//     } else {
//       pokemonImage.style.display = "none";
//       pokemonName.innerHTML = "Not Found :c";
//       pokemonNumber.innerHTML = "";
//     }
//   }
// };

// // Inicializa a busca com todos os Pokémons ao carregar
// fetchAllPokemons();

// // Event Listener para o formulário de busca
// form.addEventListener("submit", event => {
//   event.preventDefault();
//   handleSearch();
// });

// // Eventos para navegar entre os Pokémons (anterior e próximo)
// buttonPrev.addEventListener("click", () => {
//   if (searchPokemon > 1) {
//     searchPokemon -= 1;
//     renderPokemon(searchPokemon);
//   }
// });

// buttonNext.addEventListener("click", () => {
//   searchPokemon += 1;
//   renderPokemon(searchPokemon);
// });

// // Carrega o Pokémon inicial
// renderPokemon(searchPokemon);

const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form_search");
const input = document.querySelector(".input_search");
const suggestionsList = document.querySelector(".suggestions");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

let searchPokemon = 1;
let pokemonList = [];

const fetchPokemonList = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await response.json();
  pokemonList = data.results.map(pokemon => pokemon.name);
};

const fetchPokemon = async pokemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const pokemonData = await APIResponse.json();
    return pokemonData;
  }
};

const renderPokemon = async pokemon => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    searchPokemon = data.id;
    input.value = "";
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not Found :c";
    pokemonNumber.innerHTML = "";
  }
};

const fuzzySearch = query => {
  const threshold = 0.5; // Ajusta a sensibilidade
  return pokemonList.filter(name => {
    const similarity = getSimilarity(query, name);
    return similarity >= threshold;
  });
};

const getSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / longerLength;
};

const editDistance = (str1, str2) => {
  const matrix = [];
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[str2.length][str1.length];
};

const renderSuggestions = searchTerm => {
  const results = fuzzySearch(searchTerm.toLowerCase());
  results.slice(0, 5).forEach(result => {
    const li = document.createElement("li");
    li.textContent = result;
    suggestionsList.style.display = "flex";
    suggestionsList.style.padding = "0";
    li.addEventListener("click", () => {
      input.value = result;
      suggestionsList.innerHTML = "";
      renderPokemon(result);
    });
    suggestionsList.appendChild(li);
  });
};

form.addEventListener("submit", event => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

input.addEventListener("input", () => {
  const searchTerm = input.value.toLowerCase();
  if (searchTerm) {
    renderSuggestions(searchTerm);
  } else {
    suggestionsList.innerHTML = "";
    suggestionsList.style.display = "none";
  }
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

// Inicializa com o primeiro Pokémon e carrega a lista
fetchPokemonList();
renderPokemon(searchPokemon);
