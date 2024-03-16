import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import GetPokemon from '@/components/GetPokemon.vue';

// Simuler globalement fetch
vi.stubGlobal('fetch', vi.fn((url) => {
  if (url.includes('pokemon/pikachu')) {
    return Promise.resolve({
      json: () => Promise.resolve({
        name: 'pikachu',
        types: [{ type: { name: 'electric' } }],
        height: 40,
        weight: 60,
        sprites: {
          front_default: 'pikachu-front-url',
          front_shiny: 'pikachu-shiny-url',
          back_default: 'pikachu-back-url',
          back_shiny: 'pikachu-shiny-back-url',
        },
        cries: { latest: 'pikachu-audio-url' }
      }),
    });
  } else if (url.includes('pokemon/nonexistentpokemon')) {
    return Promise.resolve({
      json: () => Promise.resolve({}), // Simuler une réponse vide pour un Pokémon inexistant
    });
  } else {
    return Promise.reject('Invalid URL');
  }
}));

describe('GetPokemonComponent', () => {
  describe('getPokemon', () => {
    it('monte le composant', async () => {
      const wrapper = mount(GetPokemon);
      await wrapper.vm.$nextTick(); // Attend que Vue ait réagi aux changements
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  describe('search', () => {
    it('retourne un résultat pour la recherche pour "pikachu"', async () => {
      const wrapper = mount(GetPokemon);
      wrapper.vm.query = 'pikachu';
      await wrapper.vm.search();
      expect(wrapper.vm.results.length).toBe(1);
      expect(wrapper.vm.results[0].name).toBe('pikachu');
    });

    it('ne retourne aucun résultat pour une recherche inexistante', async () => {
      const wrapper = mount(GetPokemon);
      wrapper.vm.query = 'nonexistentpokemon';
      await wrapper.vm.search();
      expect(wrapper.vm.results.length).toBe(0);
    });
  });
});
