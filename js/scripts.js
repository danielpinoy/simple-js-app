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

        // Create an image element
        let pokemonEx = document.createElement("p");

        // Fetch the image URL using the detailsUrl
        fetch(pokemon.detailsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (pokemon) {
                console.log(pokemon.species.name);
                let pokemonExp = pokemon.base_experience;
                pokemonEx.innerText = `Race ${pokemon.species.name}`;
                pokemonEx.classList.add("pokemon-race");
                listItem.appendChild(pokemonEx);
            });

        // Set the button text
        button.innerText = pokemonName;

        // Append the button to the list item
        listItem.appendChild(button);

        // Append the list item to the Pokemon list
        pokemonListElement.appendChild(listItem);

        // Adds event listener
        button.addEventListener("click", function (event) {
            showDetails(pokemon);
        });
    }
    function showDetails(pokemon) {
        loadDetail(pokemon).then(function () {
            // Extract Pokémon details
            let height = pokemon.height;
            let types = pokemon.type.map((type) => type.type.name).join(", ");
            let abilities = pokemon.abilities.map((ability) => ability.ability.name).join(", ");
            let imgUrl = pokemon.img; // Replace with the actual URL of the Pokémon image

            // Create the modal container element
            let modalContainer = document.getElementById("modal-Container");

            // Create the modal content
            let modalContent = document.createElement("div");
            modalContent.classList.add("modal-content");

            // Create the modal title element
            let modalTitle = document.createElement("h2");
            modalTitle.innerText = "Pokémon Details";

            // Create and populate the details content
            let heightElement = document.createElement("p");
            heightElement.innerHTML = `<strong>Height:</strong> <span>${height}</span>`;
            heightElement.classList.add("pokemon-height");

            let typeElement = document.createElement("p");
            typeElement.innerHTML = `<strong>Type:</strong> <span>${types}</span>`;
            typeElement.classList.add("pokemon-type");

            let abilitiesElement = document.createElement("p");
            abilitiesElement.innerHTML = `<strong>Abilities:</strong> <span>${abilities}</span>`;
            abilitiesElement.classList.add("pokemon-abilities");

            // Create the image element for the Pokémon image
            let imgElement = document.createElement("img");
            imgElement.src = imgUrl;
            imgElement.alt = "Pokémon Image";
            imgElement.classList.add("pokemon-image");

            // Append the elements to the modal content
            modalContent.appendChild(modalTitle);
            modalContent.appendChild(heightElement);
            modalContent.appendChild(typeElement);
            modalContent.appendChild(abilitiesElement);
            modalContent.appendChild(imgElement); // Append the image element

            // Create the modal element
            const modal = document.createElement("div");
            modal.classList.add("modal");

            // Append the modal content to the modal
            modal.appendChild(modalContent);

            // Clear the modal container and add the modal
            modalContainer.innerHTML = "";
            modalContainer.appendChild(modal);

            // Show the modal
            modal.style.display = "block";

            // Close the modal when the X button is clicked
            let closeButton = document.createElement("span");
            closeButton.classList.add("close-button");
            closeButton.innerHTML = "&times;";
            closeButton.addEventListener("click", closeModal);
            modalTitle.appendChild(closeButton);

            // Close the modal when the Escape key is pressed
            document.addEventListener("keydown", function (event) {
                if (event.key === "Escape") {
                    closeModal();
                }
            });

            // Close the modal when clicking anywhere outside of it
            window.addEventListener("click", function (event) {
                if (event.target === modal) {
                    closeModal();
                }
            });
        });
    }

    function closeModal() {
        let modalContainer = document.getElementById("modal-Container");
        modalContainer.innerHTML = ""; // Clear the modal content
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
                    // console.log(pokemon);
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
                console.log(details.sprites.front_default);

                item.height = details.height;
                item.type = details.types;
                item.abilities = details.abilities;
                item.img = details.sprites.front_default;
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
        // console.log(pokemon);
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
