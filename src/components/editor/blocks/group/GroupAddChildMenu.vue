<template>
  <context-menu ref="ctx" dropdown keep-visible>
    <template v-slot:icon>
      <i class="ri-add-box-line"></i>
    </template>
    <template v-slot:title>
      <p class="block-info">Block type</p>
    </template>
    <template v-slot:default="{ close }">
      <ul class="add-child-menu" @click="close">
        <li @click="$emit('select', 'text')"><i class="ri-text"></i> Text</li>
        <li @click="$emit('select', 'columns')"><i class="ri-layout-column-line"></i> Columns</li>
        <li @click="$emit('select', 'group')"><i class="ri-layout-2-line"></i> Group</li>
      </ul>
    </template>
  </context-menu>
</template>

<script>
import ContextMenu from '@/components/editor/ContextMenu';

export default {
  name: 'GroupAddChildMenu',
  components: { ContextMenu },
  methods: {
    open() {
      this.$refs.ctx.open();
    }
  }
};
</script>

<style lang="scss" scoped>
.add-child-menu {
  font-size: $font-small;
  flex-direction: column;
  li {
    margin-bottom: $padding/2;
    i {
      vertical-align: text-top;
    }
  }
}
</style>
