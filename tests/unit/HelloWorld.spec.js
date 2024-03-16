import { describe, it, expect } from 'vitest';
import HelloWorld from '@/components/HelloWorld.vue';
import { mount } from '@vue/test-utils'; // Ajoutez cette ligne

describe('HelloWorld', () => {
  it('affiche le message correctement', () => {
    const msg = 'Bonjour, le monde!';
    const wrapper = mount(HelloWorld, {
      props: { msg },
    });

    expect(wrapper.text()).toContain(msg);
  });
});
