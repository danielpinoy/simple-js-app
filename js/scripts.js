// Task 4

//IIFE
let pokemonRepository = (() => {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=200";
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
        let pokemonListElement = document.getElementById("pokemon-list");
        let pokemonName = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`;
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        let pokemonEx = document.createElement("p");

        listItem.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "container",
            "circle"
        );

        button.classList.add(
            "hover-overlay",
            "btn",
            "btn-link",
            "dark-blue",
            "openModalButton",
            "font-weight-bold",
            "letter-spacing-sm"
        );
        listItem.classList.add("list-group");

        // Fetch the image URL using the detailsUrl
        fetch(pokemon.detailsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (pokemon) {
                pokemonEx.innerText = `Race: ${pokemon.species.name
                    .charAt(0)
                    .toUpperCase()}${pokemon.species.name.slice(1)}`;
                pokemonEx.classList.add("font-weight-bold");

                listItem.appendChild(pokemonEx);
            });

        // Set the button text
        button.innerText = pokemonName;

        // Append the button to the list item
        listItem.appendChild(button);

        // Append the list item to the Pokemon list
        pokemonListElement.appendChild(listItem);

        // Adds event listener
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetail(pokemon).then(function () {
            // Extract Pokémon details
            let height = pokemon.height;
            let types = pokemon.type.map((type) => type.type.name).join(", ");
            let abilities = pokemon.abilities.map((ability) => ability.ability.name).join(", ");
            let imgUrl = pokemon.img;
            let imgAlt = `Image of ${pokemon.name}`;
            // Create the modal container element
            let modalContainer = document.getElementById("modal-Container");
            modalContainer.classList.add("modal", "fade"); // Add "modal" and "fade" classes, and the custom "modal-side" class
            modalContainer.setAttribute("aria-labelledby", "pokemonModalLabel");
            modalContainer.setAttribute("aria-hidden", "true");

            // Create the modal dialog and content elements
            let modalDialog = document.createElement("div");
            let modalContent = document.createElement("div");
            let modalHeader = document.createElement("div");
            let modalBody = document.createElement("div");
            let modalFooter = document.createElement("div");

            modalDialog.classList.add("modal-dialog");
            modalContent.classList.add("modal-content");
            modalHeader.classList.add("modal-header");
            modalBody.classList.add("modal-body");
            modalFooter.classList.add("modal-footer");

            // Create the modal title element
            let modalTitle = document.createElement("h2");
            modalTitle.classList.add("modal-title");
            modalTitle.innerText = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(
                1
            )}`;
            // Create the close button for the modal
            let closeButton = document.createElement("button");
            closeButton.classList.add("close");
            closeButton.setAttribute("type", "button");
            closeButton.setAttribute("data-dismiss", "modal");
            closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

            // Append the close button to the modal header
            modalHeader.appendChild(modalTitle);
            modalHeader.appendChild(closeButton);

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
            imgElement.alt = imgAlt;
            imgElement.classList.add("img-fluid", "custom-image-size");

            // Create the Close button for the modal footer
            let modalCloseButton = document.createElement("button");
            modalCloseButton.classList.add("btn", "btn-secondary");
            modalCloseButton.setAttribute("type", "button");
            modalCloseButton.setAttribute("data-dismiss", "modal");
            modalBody.classList.add("text-center");

            modalCloseButton.textContent = "Close";

            //

            let detailElement = document.createElement("h3");
            detailElement.classList.add("h3");
            detailElement.innerHTML = "Pokemon Details";
            //  build the modal structure

            modalBody.appendChild(detailElement);
            modalBody.appendChild(heightElement);
            modalBody.appendChild(typeElement);
            modalBody.appendChild(abilitiesElement);
            modalBody.appendChild(imgElement);

            modalFooter.appendChild(modalCloseButton);

            modalContent.appendChild(modalHeader);
            modalContent.appendChild(modalBody);
            modalContent.appendChild(modalFooter);

            modalDialog.appendChild(modalContent);

            // Append the modal dialog to the modal container
            modalContainer.innerHTML = ""; // Clear existing content
            modalContainer.appendChild(modalDialog);

            // Get all elements with the class name "openModalButton"

            // Opens Modal when pressed
            $("#modal-Container").modal("show");

            // Close the modal when the Escape key is pressed
            document.addEventListener("keydown", function (event) {
                if (event.key === "Escape") {
                    closeModal();
                }
            });

            // Close the modal when clicking anywhere outside of it
            window.addEventListener("click", function (event) {
                if (event.target === modalContainer) {
                    closeModal();
                }
            });
        });
    }

    function closeModal() {
        $("#modal-Container").modal("hide");
    }

    function getAll() {
        return pokemonList;
    }

    // Loads list of pokemon to page
    function loadList() {
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
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function loadDetail(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                item.height = details.height;
                item.type = details.types;
                item.abilities = details.abilities;
                item.img = details.sprites.front_default;
            })
            .catch(function (e) {
                console.error(e);
            });
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
        //
        pokemonRepository.showPokemon(pokemon);
    });
});
