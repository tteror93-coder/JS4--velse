const API_URL = "https://hp-api.onrender.com/api/characters";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const characterInfo = document.getElementById("characterInfo");

let characters = [];

// Henter data fra API
async function fetchCharacters() {
  try {
    const response = await fetch(API_URL);
    characters = await response.json();
    console.log("Data hentet fra API:", characters);
  } catch (error) {
    console.error("Feil ved henting av data:", error);
  }
}

// Søker etter karakter
function searchCharacter() {
  const name = searchInput.value.toLowerCase().trim();
  const character = characters.find(c => c.name.toLowerCase() === name);

  if (character) {
    displayCharacter(character);
  } else {
    characterInfo.innerHTML = `<p>Fant ingen karakter med navnet "${searchInput.value}".</p>`;
    characterInfo.classList.remove("hidden");
  }
}

// Viser informasjon om en karakter
function displayCharacter(c) {
  characterInfo.innerHTML = `
    <img src="${c.image || 'https://via.placeholder.com/300x400?text=No+Image'}" alt="${c.name}">
    <h2>${c.name}</h2>
    <p><strong>Kjønn:</strong> ${c.gender}</p>
    <p><strong>Art:</strong> ${c.species}</p>
    <p><strong>Hus:</strong> ${c.house || "Ingen hus"}</p>
    <p><strong>Fødselsdag:</strong> ${c.dateOfBirth || "Ukjent"}</p>
    <p><strong>Patronus:</strong> ${c.patronus || "Ukjent"}</p>
    <p><strong>Skuespiller:</strong> ${c.actor}</p>
    <p><strong>Stav:</strong> ${c.wand.core ? `${c.wand.wood || "Ukjent tre"} med ${c.wand.core}` : "Ingen informasjon"}</p>
  `;
  characterInfo.classList.remove("hidden");
}

// Event Listeners
searchBtn.addEventListener("click", searchCharacter);
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchCharacter();
  }
});

// Hent karakterdata ved oppstart
fetchCharacters();
