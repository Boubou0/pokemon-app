<script setup>
  import { ref, onMounted } from 'vue';
  import "vue-select/dist/vue-select.css";

  const citiesList = ref([]);
  const selectedCity = ref(null);
  const pokemons = ref([]);
  const apiBaseURL = "https://pokeapi.co/api/v2/";
  const isLoading = ref(false);

  function SnakeCaseToSpaceCase(str) {
    return str.replace(/-/g, ' ');
  }

  async function onCityChanged() {
    if(isLoading.value) {
      return;
    }
    isLoading.value = true;
    pokemons.value = await getPokemons();
    isLoading.value = false;
  }

  async function clickOnPokemon(e) {
    let name = e.target.querySelector("h3").innerText;
    await navigator.clipboard.writeText(name);
    alert("Pokemon copied in clipboard");

  }

  async function getPokemons() {
      return new Promise(resolve => {
          let pokemons = [];
          let count = 0;
          if(selectedCity.value === null) {
            resolve(pokemons);
          }
          fetch(selectedCity.value.url)
          .then(response => response.json())
          .then(dataCity => {
              if(dataCity.areas.length === 0) {
                resolve(pokemons);
              }
              for(let area of dataCity.areas) {
                  fetch(area.url)
                  .then(response => response.json())
                  .then(data => {
                      let countPokemons = 0;
                      if(data.pokemon_encounters.length === 0) {
                        resolve(pokemons);
                      }
                      for(let pokemon_encounter of data.pokemon_encounters) {
                          let name = pokemon_encounter.pokemon.name;
                          fetch(pokemon_encounter.pokemon.url)
                          .then(response => response.json())
                          .then(pokemon => {
                              if(!pokemons.find(pokemon => pokemon.name === name)) {
                                pokemons.push({name: name, src: pokemon.sprites.front_default});
                              }
                              countPokemons++;
                              if(countPokemons === data.pokemon_encounters.length) {
                                  count++;
                                  if(dataCity.areas.length === count) {
                                      resolve(pokemons);
                                  }
                              }
                          });
                      }
                  });
              }
          });
      },);
    }

  onMounted(() => {
    // Récupère la liste de toute les villes
    fetch(apiBaseURL + "location?limit=2000")
      .then(response => response.json())
      .then(data => {
        let citiesTempList = [];
        for(let city of data.results) {
          citiesTempList.push({value: city.name, label: SnakeCaseToSpaceCase(city.name), url: city.url});
        }
        citiesList.value = citiesTempList;
      });
    });
</script>

<template>
  <div class="mapContainer">
    <img alt="PokedexRight" class="pokedexRight" src="/pokedexRight.png"/>
    <fieldset class="selectMapContainer">
      <label for="location">Location:</label>
      <v-select :options="citiesList" v-model="selectedCity" variant="solo" @update:modelValue="onCityChanged" :disabled="isLoading" />
    </fieldset>
    <div class="pokemons">
      <div class="pokemon" v-if="!isLoading" v-for="pokemon in pokemons" @click="clickOnPokemon">
        <img :src="pokemon.src" alt="pokemon" />
        <h3>{{pokemon.name}}</h3>
      </div>
      <div v-else>
        <span class="loader"></span>
      </div>
    </div>
  </div>
</template>


<style>
  .mapContainer {
    width: 600px;
    max-width: 425px;
    position: relative;
  }
  .v-select {
    width: 300px;
  }
  .pokemons {
      position: absolute;
      width: 300px;
      max-height: 350px;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: start;
      align-items: start;
      transform: translateY(-30%);
  }

  .pokemons h3 {
    text-align: center;
    pointer-events: none;
  }

  .pokemon {
    width: 100px;
    cursor: pointer;
  }

  .pokemon img {
    width: 100px;
    pointer-events: none;
  }

  fieldset {
    border: none;
    position: absolute;
    transform: translateY(-250%);
    z-index: 2;
  }

  .pokedexRight {
    position: absolute;
    bottom: 53%;
    left: 50%;
    transform: translate(-55%, 47%);
    animation: float 1s ease-in-out infinite, changeImage 6s ease-in-out infinite;
    cursor: pointer;
    max-width: 425px;
  }

  .loader {
    width: 48px;
    height: 48px;
    display: block;
    margin: 15px auto;
    position: relative;
    color: #ccc;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after,
  .loader::before {
    content: '';  
    box-sizing: border-box;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 50%;
    left: 50%;
    transform: scale(0.5) translate(0, 0);
    background-color: #666;
    border-radius: 50%;
    animation: animloader 1s infinite ease-in-out;
  }
  .loader::before {
    background-color: #FFF;
    transform: scale(0.5) translate(-48px, -48px);
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
  @keyframes animloader {
    50% {
      transform: scale(1) translate(-50%, -50%);
    }
  }
</style>
<style scoped>
 >>> {
  --vs-controls-color: #727272;
  --vs-border-color: #727272;

  --vs-dropdown-bg: #282c34;
  --vs-dropdown-color: #cc99cd;
  --vs-dropdown-option-color: #cc99cd;

  --vs-selected-bg: #727272;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;
  --vs-disabled-bg: #333;
  --vs-dropdown-option--active-bg: #727272;
  --vs-dropdown-option--active-color: #eeeeee;
 }
</style>
