<template>
  <div class="block group" @dragleave="stopDragging">
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
      tag="div"
      :group="{ name: 'editor' }"
      @click.native.self="addChildIfEmpty('text')"
      draggable=".draggable"
      @dragover.native="checkMove"
    >
      <template v-slot:header>
        <div
          class="add-child"
          v-if="!edit.children.length && !dragging"
          @click.self="$refs.addChildMenuRef.open()"
        >
          <group-add-child-menu @select="addChild" ref="addChildMenuRef" />
        </div>
      </template>
      <template v-for="child in edit.children">
        <ColumnsBlock
          v-if="child.type === 'columns'"
          class="draggable"
          :block="child"
          @update="updateChild"
          @delete="deleteChild"
          ref="blocks"
          :key="child.id"
        />
        <GroupBlock
          v-else-if="child.type === 'group'"
          class="draggable"
          :block="child"
          @update="updateChild"
          @delete="deleteChild"
          ref="blocks"
          :key="child.id"
        />
        <ContentBlock
          v-else
          class="draggable"
          :block="child"
          @new="addChild('text')"
          @update="updateChild"
          @delete="deleteChild"
          @backspace="checkCollapseChild"
          ref="blocks"
          :key="child.id"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import GroupContextMenu from './GroupContextMenu';
import GroupAddChildMenu from './GroupAddChildMenu';
import ColumnsBlock from '@/components/editor/blocks/ColumnsBlock';
import ContentBlock from '@/components/editor/blocks/ContentBlock';
import useEditBlock from '@/components/editor/blocks/composables/use-edit-block';
import useBlockChildren from '@/components/editor/blocks/composables/use-block-children';
import useBlockDrag from '@/components/editor/blocks/composables/use-block-drag';
import { onMounted, onUnmounted, onBeforeUpdate } from '@vue/composition-api';

export default {
  name: 'GroupBlock',
  components: {
    draggable,
    ColumnsBlock,
    ContentBlock,
    GroupContextMenu,
    GroupAddChildMenu,
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
      blocks,
      addChild,
      addChildIfEmpty,
      updateChild,
      deleteChild,
      checkCollapseChild
    } = useBlockChildren({ edit, update }, context);
    const { dragging, checkMove, stopDragging } = useBlockDrag({ empty });
    onMounted(() => {
      document.addEventListener('dragend', stopDragging);
    });
    onUnmounted(() => {
      document.addEventListener('dragend', stopDragging);
    });
    onBeforeUpdate(() => {
      blocks.value = [];
    });
    return {
      dragging,
      checkMove,
      stopDragging,
      edit,
      select,
      update,
      confirmDelete,
      empty,
      addChild,
      addChildIfEmpty,
      updateChild,
      deleteChild,
      checkCollapseChild,
      blocks
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
  &.dragging {
    .group-content {
      background-color: $col-background;
    }
  }
  .add-child {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: $col-background;
    padding: $padding/4;
    &.hidden {
      opacity: 0;
    }
    ::v-deep {
      i {
        transition: opacity 0.3s;
        opacity: 0.3;
      }
      &:hover {
        i {
          opacity: 1;
        }
      }
    }
  }
}
</style>
