<template>
  <div>
    <h1>Entrer le nom ou un identifiant de Pokémon :</h1>
    <input v-model="query" @keyup.enter="search" placeholder="Rechercher un Pokémon...">
    <div v-if="results.length > 0">
      <div v-for="result in results" :key="result.id">
        <h2>{{ result.name }}</h2>
        <p>Type: {{ result.types[0].type.name }}</p>
        <p>Taille: {{ result.height }} dm</p>
        <p>Poids: {{ result.weight }} hg</p>
        <audio controls :src="result.cries.latest">
          Your browser does not support the audio element.
        </audio>
        <div>
          <h3>Front Default</h3>
          <img v-if="result.sprites.front_default" :src="result.sprites.front_default" alt="Front Default">
          <img v-if="result.sprites.front_shiny" :src="result.sprites.front_shiny" alt="Front Shiny">
        </div>
        <div>
          <h3>Back Default</h3>
          <img v-if="result.sprites.back_default" :src="result.sprites.back_default" alt="Back Default">
          <img v-if="result.sprites.back_shiny" :src="result.sprites.back_shiny" alt="Back Shiny">
        </div>
      </div>
    </div>
    <p v-else v-if="searched">Aucun résultat trouvé.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');
const results = ref([]);
const searched = ref(false);

const search = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.value.toLowerCase()}`);
    const data = await response.json();
    if (data.name) {
      results.value = [data];
      searched.value = true;
    } else {
      results.value = [];
      searched.value = true;
    }
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API :', error);
  }
};
</script>
