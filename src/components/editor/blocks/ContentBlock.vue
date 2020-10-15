<template>
  <div class="block text">
    <context-menu ref="ctx" vertical>
      <template v-slot:icon>
        <i class="ri-font-size"></i>
      </template>
      <ul class="typography-list">
        <li @click="type = 'p'"><p>Paragraph</p></li>
        <li @click="type = 'h2'"><h2>Heading</h2></li>
        <li @click="type = 'h3'"><h3>Sub heading</h3></li>
      </ul>
    </context-menu>
    <TextBlock v-for="content in edit.children" :content="content" :key="content.id" />
    <textarea
      type="text"
      ref="input"
      v-model="content"
      @keydown.enter="createParagraph"
      @keydown.delete="backspace"
    />
  </div>
</template>

<script>
import { clone } from '@/utils';
import { last } from 'lodash-es';
import TextBlock from './TextBlock';
import ContextMenu from '@/components/editor/ContextMenu';

export default {
  name: 'ContentBlock',
  components: { TextBlock, ContextMenu },
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      edit: clone(this.block),
      content: '',
      id: 0
    };
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    update() {
      this.$emit('update', this.edit);
    },
    backspace(e) {
      if (e.target.value === '' && this.edit.children.length >= 1) {
        this.content = last(this.edit.children).text;
        this.edit.children.pop();
        e.preventDefault();
      }
      this.update();
    },
    createParagraph(e) {
      if (!this.content || e.shiftKey) return;
      this.edit.children.push({
        text: this.content,
        type: 'p',
        id: this.id++
      });
      this.content = '';
      e.preventDefault();
      this.update();
    }
  }
};
</script>

<style lang="scss" scoped>
input,
textarea {
  border: 0;
  outline: 0;
  background-color: transparent;
  width: 100%;
}
p {
  margin-bottom: 0.5rem;
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
