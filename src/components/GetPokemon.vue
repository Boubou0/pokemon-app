<template>
  <div>
    <div class="pokedex">
      <img :src="results[0].sprites.front_default" 
        alt="pokemon" 
        class="pokemon_image"
        v-if="results.length"/>
      <img :src="results[0].sprites.back_default" 
        alt="pokemon" 
        class="pokemon_image_inverted"
        v-if="results.length" />
            
      <h1 class="pokemon_data" v-if="results.length">
        <span class="pokemon_number">{{results[0].id}}</span> -
        <span class="pokemon_name">{{results[0].name}}</span>
      </h1>
      <div class="pokemon_details" v-if="results.length">
        <p>Type: <img v-for="(type, index) in results[0].types" :key="index" :src="'/'+results[0].types[index].type.name+'.png'"/></p>
        <p>Height: {{results[0].height}} dm</p>
        <p>Weight: {{results[0].weight}} hg</p>
      </div>

      <audio controls :src="results[0].cries.latest" @ended="audioEnd" v-if="results.length" id="audio" style="display: none">
        Your browser does not support the audio element.
      </audio>
      <button class="togglePlay" id="buttonAudio" @click="toggleAudio"></button>

      <input type="search"
        class="input_search"
        placeholder="Name or Number"
        v-model="query" @keyup.enter="search">
      <img src="https://pokedex-conrado.vercel.app/images/pokedex.png" alt="pokedex" class="pokedexImage">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');
const results = ref([]);
const searched = ref(false);

function toggleAudio(e) {
  var audio = document.getElementById("audio");
  if (audio.paused) {
    e.target.classList.add("active");
    audio.play();
  } else {
    e.target.classList.remove("active");
    audio.pause();
  }
}

function audioEnd() {
    document.getElementById("buttonAudio").classList.remove("active");
}

const search = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.value.toLowerCase()}?limit=100000`);
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

<style scoped>

.pokedex {
    width: 100%;
    max-width: 425px;
    display: flex;
    position: relative;
}

.pokemon_image {
    position: absolute;
    bottom: 53%;
    left: 50%;
    transform: translate(-63%, 20%);
    height: 25%;
    animation: float 1s ease-in-out infinite, changeImage 6s ease-in-out infinite;
    cursor: pointer;
}

.pokemon_image_inverted {
    position: absolute;
    bottom: 53%;
    left: 50%;
    transform: translate(-63%, 20%);
    height: 25%;
    animation: float 1s ease-in-out infinite, changeImageInverted 6s ease-in-out infinite;
    cursor: pointer;
}

@keyframes float {
    0%,24.9% {
        transform: translate(-63%, 20%);
    }
    25%,75% {
        transform: translate(-63%, 23%);
    }
    75.1%,100% {
        transform: translate(-63%, 20%);
    }
}

@keyframes changeImage {
    0%, 50% {
        opacity: 1;
    }
    50.1%, 75% {
        opacity: 0;
    }
    75.1%, 100% {
        opacity: 1;
    }
}

@keyframes changeImageInverted {
    0%, 50% {
        opacity: 0;
    }
    50.1%, 75% {
        opacity: 1;
    }
    75.1%, 100% {
        opacity: 0;
    }
}

.pokemon_data{
    position: absolute;
    font-weight: 600;
    color: #aaa;
    top: 54.5%;
    right: 27%;
    font-size: clamp(8px, 5vw, 25px);
}

.pokemon_details {
  position: absolute;
  font-weight: 600;
  color: black;
  top: 76%;
  left: 13.5%;
  font-size: 17px;
  border-radius: 4px;
  background: #DDD;
  padding: 3% 5%;
  border: 2px solid #333;
  width: 65%;
  box-shadow: -3px 4px 0 #888, -5px 7px 0 #333;
}

p img {
  height: 20px;
}

.pokemon_details p {
  display: flex;
  align-items: center;
  column-gap: 5px;
  flex-wrap: nowrap;
  overflow-x: visible;
}

.pokemon_name{
    color: #3a444d;
    text-transform: capitalize;
}

.input_search {
    position: absolute;
    width: 65%;
    top: 65%;
    left: 13.5%;
    padding: 4%;
    outline: none;
    border: 2px solid #333;
    border-radius: 5px;
    font-weight: 600;
    color: #3a444d;
    font-size: clamp(8px, 5vw, 1rem);
    box-shadow: -3px 4px 0 #888, -5px 7px 0 #333;
}
.togglePlay {
  border: 0;
  position: absolute;
  left: 10.3%;
  top: .7%;
  font:0/0 a;
  background: transparent;
  color:transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 0;
  width: 64px;
  height: 64px;
  border: 1px solid darken(#006B5A, 10%);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 150ms ease-out;
  
  &:after {
    box-sizing: border-box;
    display: block;
    content: '';
    width: 0;
    height: 0;
    margin-left: 8px;
    border-color: transparent;
    border-style: solid;
    border-top-width: 16px;
    border-bottom-width: 16px;
    border-left-width: 19px;
    border-left-color: rgba(255,255,255,0.9);
  }
  
  &:hover {
    transform: scale(1.05);
  }
  &.active{
    &:after {
      width: 21px;
      height: 26px;
      margin-left: 0;
      border-width:0 7px;
      border-color: rgba(255,255,255,0.9);
    }
  }
}

</style>
