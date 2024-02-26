<script setup>
  import { ref, onMounted } from 'vue';
  import "vue-select/dist/vue-select.css";

  const citiesList = ref([]);
  const selectedCity = ref(null);

  function SnakeCaseToSpaceCase(str) {
    return str.replace(/-/g, ' ');
  }

  onMounted(() => {
    fetch("https://pokeapi.co/api/v2/location?limit=2000")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let cities = data.results;
        let citiesTempList = [];
        for(let city of cities) {
          citiesTempList.push({value: city.name, label: SnakeCaseToSpaceCase(city.name)});
        }
        citiesList.value = citiesTempList;
      });
    });
</script>

<template>
  <div class="mapContainer">
    <fieldset class="selectMapContainer">
      <label for="location">Location:</label>
      <v-select :options="citiesList" v-model="selectedCity" />
    </fieldset> 
  </div>
</template>


<style>
  .mapContainer {
    width: 100%;
  }
  .v-select {
    width: 300px;
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

  --vs-dropdown-option--active-bg: #727272;
  --vs-dropdown-option--active-color: #eeeeee;
 }
</style>
