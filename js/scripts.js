// array of objects containing pokemon

// Task 4

//IIFE
let pokemonRepository = (() => {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=200";
    let loadingMessage = document.getElementById("loading-message");

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
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
        let pokemonName = `${pokemon.name}`;
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.classList.add("pokemon-button");

        // if (pokemon.height > 0.4 && pokemon.height < 0.9) {
        //     button.innerText = `${pokemonName} - Average`;
        // } else if (pokemon.height > 1) {
        //     button.innerText = `${pokemonName} - Tall`;
        // } else {
        //     button.innerText = `${pokemonName} - Small`;
        // }
        button.innerText = pokemonName;

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
        // Adds event listener
        button.addEventListener("click", function (event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetail(pokemon).then(function () {
            console.log(pokemon);
        });
    }
    function getAll() {
        return pokemonList;
    }

    // Loads list of pokemon to page
    function loadList() {
        showLoadingMessage(1000); // Show loading message with a 1-second delay

        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };

                    add(pokemon);
                    console.log(pokemon);
                });
                hideLoadingMessage(1000); // Hide loading message with a 1-second delay
            })
            .catch(function (e) {
                hideLoadingMessage(1000); // Hide loading message with a 1-second delay
                console.error(e);
            });
    }

    function loadDetail(item) {
        showLoadingMessage(1000); // Show loading message with a 1-second delay

        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.type = details.type;
                hideLoadingMessage(1000); // Hide loading message with a 1-second delay
            })
            .catch(function (e) {
                hideLoadingMessage(1000); // Hide loading message with a 1-second delay
                console.error(e);
            });
    }

    function showLoadingMessage(delay) {
        setTimeout(function () {
            loadingMessage.style.display = "block";
        }, delay);
    }

    function hideLoadingMessage(delay) {
        setTimeout(function () {
            loadingMessage.style.display = "none";
        }, delay);
    }

    return {
        getAll: getAll,
        add: add,
        findPokemonByName: findPokemonByName,
        showPokemon: addListItem,
        showDetails: showDetails,
        addEventToButton: addEventToButton,
        loadList: loadList,
    };
})();

pokemonRepository.loadList().then(function () {
    // looping around the array object using forEach
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.showPokemon(pokemon);
    });
});

// function showDetails(pokemon) {
//     pokemonRepository.loadDetails(pokemon).then(function () {
//         console.log(pokemon, "da");
//     });
// }

// Test

// let newPokemon = {
//     name: "Bulbasaur",
//     height: 0.7,
//     types: ["grass", "poison"],
// };
// pokemonRepository.addPokemon(newPokemon);
