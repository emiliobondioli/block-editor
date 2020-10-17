<template>
  <div
    class="context-menu"
    :class="{ vertical, dropdown, visible: isVisible || showMenu }"
    @mouseover="show"
    @mouseleave="hide"
    v-click-outside="close"
  >
    <div class="menu-open" @click="toggle">
      <template v-if="!showMenu || dropdown">
        <slot name="icon">
          <i class="ri-menu-line"></i>
        </slot>
      </template>
      <i v-else-if="!dropdown" class="ri-close-line"></i>
    </div>
    <div class="menu-container" v-if="showMenu">
      <header>
        <i class="ri-close-line" @click="close" v-if="dropdown"></i>
        <template v-if="showMenu">
          <slot name="title"></slot>
        </template>
      </header>
      <slot :close="close"></slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'ContextMenu',
  props: {
    vertical: Boolean,
    dropdown: Boolean,
    keepVisible: Boolean
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      showMenu: false,
      visible: false
    };
  },
  computed: {
    isVisible() {
      return this.visible || this.keepVisible;
    }
  },
  methods: {
    open() {
      this.showMenu = true;
      this.$emit('open');
    },
    toggle() {
      if (!this.showMenu) this.open();
      else this.close();
    },
    close() {
      this.showMenu = false;
      this.hide();
      this.$emit('close');
    },
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.context-menu {
  position: relative;
  opacity: 0.2;
  transition: opacity 0.3s;
  display: flex;
  &.visible {
    opacity: 1;
  }
  .menu-container,
  header {
    display: flex;
    align-items: center;
  }
  &.dropdown {
    header {
      margin-bottom: $padding/2;
    }
    .menu-container {
      position: absolute;
      flex-direction: column;
      align-items: flex-start;
      z-index: 100;
      top: 0;
      left: 0;
      background: $col-background-light;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
      padding: $padding/2;
      min-width: 8rem;
    }
    ::v-deep {
      ul {
        align-items: flex-start;
      }
    }
  }
  &.vertical ul {
    flex-direction: column;
  }
  ::v-deep {
    ul,
    li {
      list-style: none;
      padding: 0;
    }
    ul {
      display: flex;
      align-items: center;
      li {
        margin-right: $padding/2;
        cursor: pointer;
      }
    }
  }
}
</style>
