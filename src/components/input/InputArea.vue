<template>
  <textarea
    ref="input"
    v-text="value"
    placeholder="Start writing"
    @keydown="$listeners.keydown"
    @input="update($event.target.value)"
    :style="{ height }"
  ></textarea>
</template>

<script>
export default {
  name: 'InputArea',
  props: {
    value: {
      type: String,
      default: ''
    },
    autoresize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      height: 'auto'
    };
  },
  mounted() {
    this.height = this.$refs.input.scrollHeight + 'px';
  },
  methods: {
    update(value) {
      this.height = 'auto';
      this.$emit('input', value);
      this.height = this.$refs.input.scrollHeight + 'px';
    },
    focus() {
      this.$refs.input.focus();
      this.$refs.input.selectionStart = this.$refs.input.selectionEnd = this.$refs.input.value.length;
    },
    empty() {}
  }
};
</script>

<style lang="scss" scoped>
textarea {
  overflow-y: hidden;
}
</style>
