<template>
  <div class="block group">
    <header>
      <GroupContextMenu
        @add-child="addChild"
        @delete="confirmDelete"
        :block="block"
        :can-delete="!root"
      />
    </header>
    <draggable
      v-model="edit.children"
      class="group-content"
      :class="{ empty }"
      tag="div"
      :group="{ name: 'editor' }"
      @click.native.self="addChildIfEmpty('text')"
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
import draggable from 'vuedraggable';
import GroupContextMenu from './GroupContextMenu';
import ColumnsBlock from '@/components/editor/blocks/ColumnsBlock';
import ContentBlock from '@/components/editor/blocks/ContentBlock';
import useEditBlock from '@/components/editor/blocks/composables/use-edit-block';
import useBlockChildren from '@/components/editor/blocks/composables/use-block-children';

export default {
  name: 'GroupBlock',
  components: {
    draggable,
    ColumnsBlock,
    ContentBlock,
    GroupContextMenu,
    GroupBlock: () => import('./GroupBlock')
  },
  props: {
    block: {
      type: Object,
      required: true
    },
    root: Boolean
  },
  setup(props, { emit, root }) {
    const { $store, $set } = root;
    const context = { emit, $store, $set };
    const { edit, update, confirmDelete, select } = useEditBlock(props, context);
    const {
      empty,
      addChild,
      addChildIfEmpty,
      updateChild,
      deleteChild,
      getPreviousChild,
      selectPreviousChild,
      checkCollapseChild
    } = useBlockChildren({ edit, update }, context);
    return {
      edit,
      select,
      update,
      confirmDelete,
      empty,
      addChild,
      addChildIfEmpty,
      updateChild,
      deleteChild,
      getPreviousChild,
      selectPreviousChild,
      checkCollapseChild
    };
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
