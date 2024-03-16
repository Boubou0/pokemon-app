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
        it('affiche les résultats de la recherche pour "pikachu"', async () => {
            const wrapper = mount(GetPokemon);
            wrapper.vm.query = 'pikachu';
            await wrapper.vm.search();
            expect(wrapper.findAll('h2').length).toBe(1);
            expect(wrapper.find('h2').text()).toBe('pikachu');
        });

        it('affiche un message si aucun résultat n\'est trouvé pour une recherche inexistante', async () => {
            const wrapper = mount(GetPokemon);
            wrapper.vm.query = 'nonexistentpokemon';
            await wrapper.vm.search();
            expect(wrapper.find('p').text()).toBe('Aucun résultat trouvé.');
        });

        it('affiche les résultats de la recherche pour l\'input "pikachu"', async () => {
            const wrapper = mount(GetPokemon);

            // Simuler l'entrée de l'utilisateur dans l'input
            await wrapper.find('input').setValue('pikachu');

            // Déclencher la recherche en simulant l'appui sur la touche "Enter"
            await wrapper.find('input').trigger('keyup.enter');

            // Attendre que la recherche soit effectuée
            await wrapper.vm.$nextTick();

            // Attendre que le DOM soit mis à jour après la recherche
            await wrapper.vm.$nextTick();

            // Vérifier si la balise <h2> est maintenant présente après la recherche
            expect(wrapper.find('h2').exists()).toBe(true);

            // Vérifier le contenu de la balise <h2>
            expect(wrapper.find('h2').text()).toBe('pikachu');
        });
    });
});
