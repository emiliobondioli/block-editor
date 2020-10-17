import { computed, ref } from '@vue/composition-api';

export default function({ edit, update }, { $store, $set }) {
  const blocks = ref([]);
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

  const getChildIndex = child => {
    return edit.value.children.findIndex(c => c.id === child.id);
  };

  const getChild = idx => {
    return edit.value.children[idx];
  };

  const selectChildComponent = child => {
    const idx = getChildIndex(child);
    const childComponent = blocks.value[idx];
    if (childComponent && childComponent.editBlock) {
      childComponent.editBlock();
    }
  };

  const checkCollapseChild = child => {
    const idx = getChildIndex(child);
    const prev = getChild(idx - 1);
    if (prev && prev.type === 'text') {
      selectChildComponent(prev);
      updateChild({ ...prev, content: prev.content + child.content });
      deleteChild(child);
    }
  };

  return {
    empty,
    blocks,
    addChild,
    addChildIfEmpty,
    updateChild,
    deleteChild,
    checkCollapseChild
  };
}
