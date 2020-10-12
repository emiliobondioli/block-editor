import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const defaultBlocks = {
  group: () => ({
    type: 'group',
    children: []
  }),
  text: () => ({
    type: 'text',
    content: ''
  }),
  columns: async context => {
    const block = {
      type: 'columns',
      children: []
    };
    for (let i = 0; i < 2; i++) {
      const group = await context.dispatch('create', { type: 'group' });
      block.children.push(group);
    }
    return block;
  }
};

export default new Vuex.Store({
  state: {
    blocks: [],
    id: 0
  },
  mutations: {
    ADD_BLOCK(state, data) {
      state.blocks.push(data);
    },
    INCREMENT_ID(state) {
      state.id += 1;
    },
    UPDATE_BLOCK(state, data) {
      const idx = state.blocks.findIndex(b => b.id === data.id);
      Vue.set(state.blocks, idx, data);
    }
  },
  actions: {
    async create(context, data) {
      context.commit('INCREMENT_ID');
      const id = context.state.id;
      let template = defaultBlocks[data.type];
      const block = await template(context);
      block.id = id;
      context.commit('ADD_BLOCK', block);
      return block;
    }
  },
  modules: {}
});
