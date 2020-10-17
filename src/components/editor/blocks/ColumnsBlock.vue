<template>
  <div class="block columns">
    <context-menu ref="ctx">
      <template v-slot:icon>
        <i class="ri-layout-column-line" title="Columns"></i>
      </template>
      <template v-slot:title>
        <p class="block-info">{{ block.type }} {{ block.id }}</p>
      </template>
      <ul>
        <li @click="addChild"><i class="ri-add-box-line"></i></li>
        <li @click="confirmDelete"><i class="ri-delete-bin-5-line"></i></li>
      </ul>
    </context-menu>
    <div class="cols">
      <GroupBlock
        v-for="child in block.children"
        :key="child.id"
        :block="child"
        :style="{ flex: child.options.flex }"
        class="col"
        @delete="deleteChild"
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
      this.$store.dispatch('create', { type: 'group', options: { flex: 1 } }).then(block => {
        this.edit.children.push(block);
        this.$refs.ctx.close();
        this.update();
      });
    },
    confirmDelete() {
      if (this.$store.state.confirmDelete) {
        const confirmDelete = confirm('Are you sure you want to delete?');
        if (!confirmDelete) return;
      }
      this.$emit('delete', this.edit);
    },
    deleteChild(child) {
      const idx = this.edit.children.findIndex(c => c.id === child.id);
      this.edit.children.splice(idx, 1);
      this.$store.dispatch('delete', child);
      this.update();
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
