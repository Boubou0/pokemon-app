import { describe, it, expect, vi } from 'vitest';
import { mount, config } from '@vue/test-utils';
import MapSearch from '@/components/MapSearch.vue';
import vSelect from 'vue-select';
import { ref } from 'vue';

// Enregistrer globalement le composant v-select pour les tests
config.global.components = {
  'v-select': vSelect
};

// Simuler globalement fetch
vi.stubGlobal('fetch', vi.fn((url) => {
  if (url.includes('location?')) {
    return Promise.resolve({
      json: () => Promise.resolve({ results: [{ name: 'city1', url: "test-area-url" }] }),
    });
  } else if (url.includes('location')) {
    return Promise.resolve({
      json: () => Promise.resolve({ areas: [{ url: "test-area-url" }] }),
    });
  } else if (url.includes('area')) {
    return Promise.resolve({
      json: () => Promise.resolve({ pokemon_encounters: [{ pokemon: { name: "pikachu", url: "test-pokemon-url" } }] }),
    });
  } else if (url.includes('pokemon')) {
    return Promise.resolve({
      json: () => Promise.resolve({ sprites: { front_default: "pikachu-image-url" } }),
    });
  }
}
));

describe('MapSearch', () => {
  it('monte le composant', async () => {
    const wrapper = mount(MapSearch);
    await wrapper.vm.$nextTick(); // Attend que Vue ait réagi aux changements
    expect(wrapper.exists()).toBeTruthy();
  });
});

describe('getPokemons', () => {
  it('récupère les pokemons basé sur la ville sélectionnée', async () => {

    const wrapper = mount(MapSearch, {
      global: {
        provide: {
          selectedCity: ref({ url: 'test-location-url', name: 'city1' }) // Fournissez la ref ici
        }
      }
    });
    wrapper.vm.selectedCity = { url: 'test-location-url', name: 'city1' };
    await wrapper.vm.onCityChanged();
    expect(wrapper.vm.pokemons).toHaveLength(1);
    expect(wrapper.vm.pokemons[0].name).toBe("pikachu");
  });
});
