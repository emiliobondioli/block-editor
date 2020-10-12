<template>
  <div class="block columns">
    <context-menu ref="ctx">
      <ul>
        <li @click="addChild"><i class="ri-add-box-line"></i></li>
        <li><i class="ri-delete-bin-5-line"></i></li>
      </ul>
    </context-menu>
    <div class="cols">
      <GroupBlock
        v-for="child in block.children"
        :key="child.id"
        :block="child"
        class="col"
      />
    </div>
  </div>
</template>

<script>
import { clone } from '@/utils';
import ContextMenu from '../ContextMenu';

export default {
  name: 'ColumnsBlock',
  components: { ContextMenu, GroupBlock: () => import('./GroupBlock') },
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
    addChild() {
      this.$store.dispatch('create', { type: 'group' }).then(block => {
        this.edit.children.push(block);
        this.$refs.ctx.close();
        this.update();
      });
    },
    update() {
      this.$emit('update', this.edit);
    }
  }
};
</script>

<style lang="scss" scoped>
.cols {
  display: flex;
  .col {
    flex: 1;
  }
}
</style>
