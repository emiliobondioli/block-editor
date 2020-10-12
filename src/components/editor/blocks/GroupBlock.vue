<template>
  <div class="block group">
    <header>
      <context-menu @open="showAddChild = false" ref="ctx">
        <ul v-if="!showAddChild">
          <li @click="openSettings"><i class="ri-settings-4-line"></i></li>
          <li @click="showAddChild = true"><i class="ri-add-box-line"></i></li>
          <li @click="confirmDelete"><i class="ri-delete-bin-5-line"></i></li>
        </ul>
        <add-child-menu v-else @select="addChild" />
      </context-menu>
    </header>
    <draggable v-model="edit.children" class="group-content" tag="div">
      <div v-for="child in edit.children" :key="child.id">
        <ColumnsBlock v-if="child.type === 'columns'" :block="child" @update="updateChild" />
        <GroupBlock v-else-if="child.type === 'group'" :block="child" @update="updateChild" />
        <TextBlock v-else :block="child" @update="updateChild" />
      </div>
    </draggable>
  </div>
</template>

<script>
import { clone } from '@/utils';
import ContextMenu from '../ContextMenu';
import AddChildMenu from '../AddChildMenu';
import draggable from 'vuedraggable';
import ColumnsBlock from './ColumnsBlock';
import TextBlock from './TextBlock';

export default {
  name: 'Group',
  components: {
    ContextMenu,
    AddChildMenu,
    draggable,
    ColumnsBlock,
    TextBlock,
    GroupBlock: () => import('./GroupBlock')
  },
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showAddChild: false,
      edit: clone(this.block)
    };
  },
  methods: {
    openSettings() {},
    confirmDelete() {},
    addChild(type) {
      this.$store.dispatch('create', { type }).then(block => {
        this.edit.children.push(block);
        this.$refs.ctx.close();
        this.update();
      });
    },
    updateChild(child) {
      const idx = this.edit.children.findIndex(c => c.id === child.id);
      this.$set(this.edit.children, idx, child);
      this.update();
    },
    update() {
      this.$emit('update', this.edit);
    }
  }
};
</script>

<style></style>
