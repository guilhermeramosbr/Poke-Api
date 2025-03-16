document.addEventListener('DOMContentLoaded', () => {
    const pokemonNameInput = document.getElementById('pokemonName');
    const searchButton = document.getElementById('searchButton');
    const resultDiv = document.getElementById('result');
    const pokemonNameDisplay = document.getElementById('pokemonNameDisplay');
    const pokemonImage = document.getElementById('pokemonImage');
    const pokemonTypes = document.getElementById('pokemonTypes');

    const typeColors = {
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#F7D02C",
        grass: "#7AC74C",
        ice: "#96D9D6",
        fighting: "#C22E28",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD"
    };

    searchButton.addEventListener('click', async () => {
        const pokemon = pokemonNameInput.value.toLowerCase();

        try {
            resultDiv.style.display = 'block';
            pokemonNameDisplay.textContent = 'Carregando...';
            pokemonImage.src = '';
            pokemonTypes.textContent = '';
            resultDiv.style.backgroundColor = ''; // Remove a cor de fundo anterior

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            if (!response.ok) {
                throw new Error('Pokémon não encontrado. Verifique se o nome foi digitado corretamente.');
            }

            const data = await response.json();

            pokemonNameDisplay.textContent = data.name;
            pokemonImage.src = data.sprites.front_default;

            const types = data.types.map(t => t.type.name);
            pokemonTypes.textContent = `Tipos: ${types.join(', ')}`;

            // Define a cor de fundo com base no primeiro tipo do Pokémon
            if (types.length > 0 && typeColors[types[0]]) {
                resultDiv.style.backgroundColor = typeColors[types[0]];
            }

        } catch (error) {
            pokemonNameDisplay.textContent = '';
            pokemonImage.src = '';
            pokemonTypes.textContent = error.message;
            resultDiv.style.backgroundColor = ''; // Remove a cor de fundo em caso de erro
        }
    });
});