// array of objects containing pokemon

// Task 4

//IIFE
let pokemonRepository = (() => {
    let pokemonList = [
        { name: "Fearow", height: 1.2, types: ["normal", "flying"] },
        { name: "Pikachu", height: 0.4, types: ["electric"] },
        { name: "Sunflora", height: 0.8, types: ["grass"] },
        { name: "Kadabra", height: 1.3, types: ["psychic"] },
        { name: "Emboar", height: 1.6, types: ["fire", "fighting"] },
    ];

    function addPokemon(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            alert("Invalid input. Please provide a valid Pokémon object.");
        }
    }

    function findPokemonByName(name) {
        let pokemonName = pokemonList.filter((pokemon) => {
            return pokemon.name === name;
        });
        console.log(pokemonName);
    }

    // Advance task
    // adding new event listener to your new button
    function addEventToButton(button, pokemon) {
        // Add a click event listener to the button
        button.addEventListener("click", function () {
            showDetails(pokemon); // Call showDetails with the Pokémon object
        });
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector("ul");
        let pokemonName = `${pokemon.name} Height (${pokemon.height})`;
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.classList.add("pokemon-button");

        if (pokemon.height > 0.4 && pokemon.height < 0.9) {
            button.innerText = `${pokemonName} - Average`;
        } else if (pokemon.height > 1) {
            button.innerText = `${pokemonName} - Tall`;
        } else {
            button.innerText = `${pokemonName} - Small`;
        }

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
        // Adds event listener
        button.addEventListener("click", function () {
            showDetails(pokemon); // Call showDetails with the Pokémon object
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }
    function getAll() {
        return pokemonList;
    }
    return {
        getAll: getAll,
        add: addPokemon,
        findPokemonByName: findPokemonByName,
        showPokemon: addListItem,
        showDetails: showDetails,
        addEventToButton: addEventToButton,
    };
})();

// looping around the array object using forEach
pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.showPokemon(pokemon);
});

// Test

// let newPokemon = {
//     name: "Bulbasaur",
//     height: 0.7,
//     types: ["grass", "poison"],
// };
// pokemonRepository.addPokemon(newPokemon);
