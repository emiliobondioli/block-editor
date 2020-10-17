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
    tag: 'p',
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
    id: 0,
    confirmDelete: false
  },
  mutations: {
    ADD_BLOCK(state, data) {
      state.blocks.push(data);
    },
    REMOVE_BLOCK(state, data) {
      const idx = state.blocks.findIndex(c => c.id === data.id);
      state.blocks.splice(idx, 1);
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
      block.options = { ...data.options };
      context.commit('ADD_BLOCK', block);
      return block;
    },
    delete(context, data) {
      if (data.children && data.children.length) {
        data.children.forEach(c => context.dispatch('delete', c));
      }
      context.commit('REMOVE_BLOCK', data);
      return data;
    }
  },
  modules: {}
});
