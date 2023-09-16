// Task 1

// let favoriteFood = "Pizza";

// document.write(favoriteFood);
// alert("Hello World");

// Task 2

// array of objects containing pokemon
let pokemonList = [
    { name: "Fearow", height: 1.2, types: ["normal", "flying"] },
    { name: "Pikachu", height: 0.4, types: ["electric"] },
    { name: "Sunflora", height: 0.8, types: ["grass"] },
    { name: "Kadabra", height: 1.3, types: ["psychic"] },
    { name: "Emboar", height: 1.6, types: ["fire", "fighting"] },
];

// Task 3

// for loop
// loops around the pokemonList array
for (let i = 0; i < pokemonList.length; i++) {
    // condition to find the pokemon with an average height
    if (pokemonList[i].height > 0.4 && pokemonList[i].height < 0.9) {
        document.write(
            `${pokemonList[i].name} Height (${pokemonList[i].height}) Average Height <br>`
        );
    }
    //  find the tallest pokemon
    else if (pokemonList[i].height > 1) {
        document.write(`${pokemonList[i].name} Height (${pokemonList[i].height}) Tall  <br>`);
    }
    // find the shortest pokemon
    else {
        document.write(`${pokemonList[i].name} Height (${pokemonList[i].height}) Small <br>`);
    }
}
