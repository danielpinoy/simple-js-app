// array of objects containing pokemon

// Task 4
let pokemonRepository = (() => {
    let pokemonList = [
        { name: "Fearow", height: 1.2, types: ["normal", "flying"] },
        { name: "Pikachu", height: 0.4, types: ["electric"] },
        { name: "Sunflora", height: 0.8, types: ["grass"] },
        { name: "Kadabra", height: 1.3, types: ["psychic"] },
        { name: "Emboar", height: 1.6, types: ["fire", "fighting"] },
    ];

    return {
        getAll: function () {
            return pokemonList;
        },
        add: function (pokemon) {
            if (typeof pokemon === "string") {
                return pokemonList.push(pokemon);
            } else {
                alert("Needs to be string");
            }
        },
        // finds names using filter
        findPokemonByName: function (name) {
            // finds pokemon name
            let pokemonName = pokemonList.filter((pokemon) => {
                return pokemon.name === name;
            });
            console.log(pokemonName);
        },
    };
})();

pokemonRepository.getAll().forEach((pokemon) => {
    let pokemonName = `${pokemon.name} Height (${pokemon.height})`;

    // condition to find the pokemon with an average height
    if (pokemon.height > 0.4 && pokemon.height < 0.9) {
        document.write(`${pokemonName} - Average  <br>`);
    }

    //  find the tallest pokemon
    else if (pokemon.height > 1) {
        document.write(`${pokemonName} - Tall  <br>`);
    }

    // filter out the shortest
    else {
        document.write(`${pokemonName} - Small <br>`);
    }
});

// Task 3

// for loop
// loops inside the pokemonList array of objects

for (let i = 0; i < pokemonList.length; i++) {
    let pokemonName = `${pokemonList[i].name} Height (${pokemonList[i].height})`;

    // condition to find the pokemon with an average height
    if (pokemonList[i].height > 0.4 && pokemonList[i].height < 0.9) {
        document.write(`${pokemonName} - Average  <br>`);
    }

    //  find the tallest pokemon
    else if (pokemonList[i].height > 1) {
        document.write(`${pokemonName} - Tall  <br>`);
    }

    // filter out the shortest
    else {
        document.write(`${pokemonName} - Small <br>`);
    }
}
