<template>
  <ul class="add-child-menu">
    <li @click="$emit('select', 'text')"><i class="ri-text"></i> Text</li>
    <li @click="$emit('select', 'columns')"><i class="ri-layout-column-line"></i> Columns</li>
    <li @click="$emit('select', 'group')"><i class="ri-layout-2-line"></i> Group</li>
  </ul>
</template>

<script>
export default {
  name: 'AddChildMenu'
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
