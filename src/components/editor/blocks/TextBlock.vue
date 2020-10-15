<template>
  <p v-if="content.type === 'p'">{{ text }}</p>
  <h2 v-else-if="content.type === 'h2'">{{ text }}</h2>
  <h3 v-else-if="content.type === 'h3'">{{ text }}</h3>
  <h4 v-else-if="content.type === 'h4'">{{ text }}</h4>
</template>

<script>
export default {
  name: 'TextBlock',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    text() {
      return this.content.text
    }
  },
};
</script>

<style lang="scss" scoped>
p {
  white-space: pre-wrap;
}
</style>
