import { computed, ref } from '@vue/composition-api';

export default function({ edit, update }, { $store, $set }) {
  const blocks = ref(null);
  const empty = computed(() => !edit.value.children.length);

  const addChild = type => {
    $store.dispatch('create', { type }).then(block => {
      edit.value.children.push(block);
      update();
    });
  };

  const addChildIfEmpty = type => {
    if (empty.value) addChild(type);
  };

  const updateChild = child => {
    const idx = edit.value.children.findIndex(c => c.id === child.id);
    $set(edit.value.children, idx, child);
    update();
  };

  const deleteChild = child => {
    const idx = edit.value.children.findIndex(c => c.id === child.id);
    edit.value.children.splice(idx, 1);
    $store.dispatch('delete', child);
    update();
  };

  const getPreviousChild = child => {
    const idx = edit.value.children.findIndex(c => c.id === child.id);
    return edit.value.children[idx - 1];
  };

  const selectPreviousChild = idx => {
    const prev = blocks[idx - 1];
    if (prev && prev.editBlock) {
      prev.editBlock();
    }
  };

  const checkCollapseChild = child => {
    const prev = getPreviousChild(child);
    if (prev && prev.type === 'text') {
      updateChild({ ...prev, content: prev.content + child.content });
      deleteChild(child);
    }
  };

  return {
    empty,
    addChild,
    addChildIfEmpty,
    updateChild,
    deleteChild,
    getPreviousChild,
    selectPreviousChild,
    checkCollapseChild
  };
}
