<template>
  <div class="block content">
    <TextBlock :block="block" v-if="block.type === 'text'" v-on="$listeners" ref="block" />
  </div>
</template>
<script>
import TextBlock from './TextBlock';

export default {
  name: 'ContentBlock',
  components: { TextBlock },
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  methods: {
    editBlock() {
      this.$refs.block.startEditing();
    }
  }
};
</script>
