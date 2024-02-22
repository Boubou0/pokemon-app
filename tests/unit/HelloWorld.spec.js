import { mount } from 'vitest';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld', () => {
    it('affiche le message correctement', () => {
        const msg = 'Bonjour, le monde!';
        const wrapper = mount(HelloWorld, {
            props: { msg },
        });

        expect(wrapper.text()).toContain(msg);
    });
});
