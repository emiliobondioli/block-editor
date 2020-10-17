<template>
  <div class="block text" @click="startEditing" v-click-outside="stopEditing">
    <context-menu ref="ctx" vertical dropdown>
      <template v-slot:icon>
        <i class="ri-font-size" title="Text preset"></i>
      </template>
      <template v-slot:default="{ close }">
        <ul class="typography-list" @click="close">
          <li @click="setType('p')"><p>Paragraph</p></li>
          <li @click="setType('h2')"><h2>Heading</h2></li>
          <li @click="setType('h3')"><h3>Sub heading</h3></li>
        </ul>
      </template>
    </context-menu>
    <template v-if="!editing && edit.content">
      <p v-if="edit.tag === 'p'">{{ edit.content }}</p>
      <h2 v-else-if="edit.tag === 'h2'">{{ edit.content }}</h2>
      <h3 v-else-if="edit.tag === 'h3'">{{ edit.content }}</h3>
      <h4 v-else-if="edit.tag === 'h4'">{{ edit.content }}</h4>
    </template>
    <InputArea
      v-else
      ref="inputRef"
      :class="edit.tag"
      v-model="edit.content"
      @input="update"
      @keydown.enter="checkCreateNewBlock"
      @keydown.delete="backspace"
    />
  </div>
</template>

<script>
import ContextMenu from '@/components/editor/ContextMenu';
import InputArea from '@/components/input/InputArea';
import ClickOutside from 'vue-click-outside';
import useEditBlock from '@/components/editor/blocks/composables/use-edit-block';
import useTextBlock from '@/components/editor/blocks/composables/use-text-block';

export default {
  name: 'TextBlock',
  components: { ContextMenu, InputArea },
  directives: {
    ClickOutside
  },
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit, root }) {
    const { $store, $set, $nextTick } = root;
    const context = { emit, $store, $set, $nextTick };
    const { edit, editing, update, select } = useEditBlock(props, context);
    const {
      inputRef,
      setType,
      backspace,
      startEditing,
      stopEditing,
      checkCreateNewBlock
    } = useTextBlock({ update, edit, editing }, context);
    return {
      edit,
      editing,
      update,
      select,
      inputRef,
      setType,
      backspace,
      startEditing,
      stopEditing,
      checkCreateNewBlock
    };
  },
  mounted() {
    if (this.$refs.inputRef) this.$refs.inputRef.focus();
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  cursor: pointer;
}
p {
  white-space: pre-wrap;
}
input,
textarea {
  border: 0;
  outline: 0;
  background-color: transparent;
  width: 100%;
}
.typography-list {
  li {
    min-height: 2rem;
    padding: $padding/4;
    border-bottom: 1px solid #dbdbdb;
    min-width: 10rem;
    display: flex;
    align-items: center;
  }
}
</style>
