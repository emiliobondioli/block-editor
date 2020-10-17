<template>
  <div class="block group">
    <header>
      <context-menu ref="ctx">
        <template v-slot:icon>
          <i class="ri-layout-2-line" title="Group"></i>
        </template>
        <template v-slot:title>
          <p class="block-info">{{ block.type }} {{ block.id }}</p>
        </template>
        <ul>
          <li @click="openSettings" title="Block settings"><i class="ri-settings-4-line"></i></li>
          <li title="Add block">
            <context-menu ref="ctx-child" dropdown keep-visible>
              <template v-slot:icon>
                <i class="ri-add-box-line"></i>
              </template>
              <template v-slot:title>
                <p class="block-info">Block type</p>
              </template>
              <add-child-menu @select="addChild" />
            </context-menu>
          </li>
          <li v-if="!root" @click="confirmDelete" title="Delete block">
            <i class="ri-delete-bin-5-line"></i>
          </li>
        </ul>
      </context-menu>
    </header>
    <draggable
      v-model="edit.children"
      class="group-content"
      :class="{ empty }"
      tag="div"
      :group="{ name: 'editor' }"
      @click.native="addChildIfEmpty"
    >
      <div v-for="child in edit.children" :key="child.id">
        <ColumnsBlock
          v-if="child.type === 'columns'"
          :block="child"
          @update="updateChild"
          @delete="deleteChild"
          ref="blocks"
        />
        <GroupBlock
          v-else-if="child.type === 'group'"
          :block="child"
          @update="updateChild"
          @delete="deleteChild"
          ref="blocks"
        />
        <ContentBlock
          v-else
          :block="child"
          @new="addChild('text')"
          @update="updateChild"
          @delete="deleteChild"
          @backspace="checkCollapseChild"
          ref="blocks"
        />
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
import ContentBlock from './ContentBlock';

export default {
  name: 'Group',
  components: {
    ContextMenu,
    AddChildMenu,
    draggable,
    ColumnsBlock,
    ContentBlock,
    GroupBlock: () => import('./GroupBlock')
  },
  props: {
    block: {
      type: Object,
      required: true
    },
    root: Boolean
  },
  data() {
    return {
      edit: clone(this.block)
    };
  },
  computed: {
    empty() {
      return !this.edit.children.length;
    }
  },
  methods: {
    openSettings() {},
    confirmDelete() {
      if (this.$store.state.confirmDelete) {
        const confirmDelete = confirm('Are you sure you want to delete?');
        if (!confirmDelete) return;
      }
      this.$emit('delete', this.edit);
    },
    addChildIfEmpty() {
      if (this.empty) this.addChild('text');
    },
    checkCollapseChild(child) {
      const prev = this.getPreviousChild(child);
      if (prev && prev.type === 'text') {
        this.updateChild({ ...prev, content: prev.content + child.content });
        this.deleteChild(child);
      }
    },
    getPreviousChild(child) {
      const idx = this.edit.children.findIndex(c => c.id === child.id);
      return this.edit.children[idx - 1];
    },
    deleteChild(child) {
      const idx = this.edit.children.findIndex(c => c.id === child.id);
      this.edit.children.splice(idx, 1);
      this.$store.dispatch('delete', child);
      this.update();
      const prev = this.$refs.blocks[idx - 1];
      if (prev && prev.editBlock) {
        prev.editBlock();
      }
    },
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

<style lang="scss" scoped>
.group {
  display: flex;
  flex-direction: column;
  .group-content {
    &.empty {
      cursor: pointer;
    }
    flex: 1;
  }
}
</style>
