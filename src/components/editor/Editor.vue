<template>
  <div class="block-editor">
    <GroupBlock :block="block" @update="block = $event" root />
  </div>
</template>

<script>
import GroupBlock from './blocks/GroupBlock';

export default {
  name: 'Editor',
  components: { GroupBlock },
  data: function() {
    return {
      block: {
        id: 0,
        type: 'group',
        options: {},
        children: []
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.block-editor {
  padding: $padding;
}
</style>
