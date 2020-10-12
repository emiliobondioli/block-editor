<template>
  <textarea class="block text" v-model="edit.content" @input="update"></textarea>
</template>

<script>
import { clone } from '@/utils';

export default {
  name: 'TextBlock',
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      edit: clone(this.block)
    };
  },
  methods: {
    update() {
      this.$emit('update', this.edit);
    }
  }
};
</script>

<style></style>
