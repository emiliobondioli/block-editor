<template>
  <div class="context-menu">
    <div class="menu-open" @click="open">
      <i class="ri-menu-line"></i>
    </div>
    <div class="menu-container" v-show="show">
      <i class="ri-close-line" @click="close"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  data() {
    return {
      show: false
    };
  },
  methods: {
    open() {
      this.show = true;
      this.$emit('open');
    },
    close() {
      this.show = false;
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.context-menu {
  position: relative;
  padding: $padding/2;
  .menu-container {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    background: $col-background-light;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: $padding/2;
  }
  ::v-deep {
    ul,
    li {
      list-style: none;
      padding: 0;
    }
    ul {
      display: flex;
      li {
        margin-right: $padding/2;
        cursor: pointer;
      }
    }
  }
}
</style>
