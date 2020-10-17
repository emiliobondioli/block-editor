<template>
  <div class="block text" @click="startEditing" v-click-outside="stopEditing">
    <context-menu ref="ctx" vertical dropdown>
      <template v-slot:icon>
        <i class="ri-font-size" title="Text preset"></i>
      </template>
      <ul class="typography-list">
        <li @click="setType('p')"><p>Paragraph</p></li>
        <li @click="setType('h2')"><h2>Heading</h2></li>
        <li @click="setType('h3')"><h3>Sub heading</h3></li>
      </ul>
    </context-menu>
    <template v-if="!editing && edit.content">
      <p v-if="edit.tag === 'p'">{{ text }}</p>
      <h2 v-else-if="edit.tag === 'h2'">{{ text }}</h2>
      <h3 v-else-if="edit.tag === 'h3'">{{ text }}</h3>
      <h4 v-else-if="edit.tag === 'h4'">{{ text }}</h4>
    </template>
    <InputArea
      v-else
      ref="input"
      :class="currentClass"
      v-model="edit.content"
      @input="update"
      @keydown.enter="newBlock"
      @keydown.delete="backspace"
    />
  </div>
</template>

<script>
import { clone } from '@/utils';
import ContextMenu from '@/components/editor/ContextMenu';
import InputArea from '@/components/input/InputArea';
import ClickOutside from 'vue-click-outside';

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
  watch: {
    block() {
      this.edit = clone(this.block);
    }
  },
  data() {
    return {
      editing: true,
      edit: clone(this.block)
    };
  },
  mounted() {
    this.$refs.input.focus();
  },
  computed: {
    currentClass() {
      return this.edit.tag;
    },
    text() {
      return this.edit.content;
    }
  },
  methods: {
    update() {
      this.$emit('update', this.edit);
    },
    away() {
      console.log('away');
      this.stopEditing();
    },
    setType(type) {
      this.edit.tag = type;
      this.$refs.ctx.close();
      this.update();
    },
    backspace(e) {
      if (e.target.value === '') {
        this.$emit('delete', this.edit);
        e.preventDefault();
      } else if (e.target.selectionStart === 0) {
        this.$emit('backspace', this.edit);
        e.preventDefault();
      }
    },
    startEditing() {
      if (this.editing) return;
      this.editing = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    stopEditing() {
      if (!this.editing) return;
      this.editing = false;
      if (!this.edit.content) this.$emit('delete', this.edit);
    },
    newBlock(e) {
      if (!this.block || e.shiftKey) return;
      this.stopEditing();
      this.$emit('new');
      e.preventDefault();
    }
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
